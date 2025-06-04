using ITJobs.Entities.Exceptions;
using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ITJobs.Entities.Exceptions.InvalidPostException;

namespace ITJobs.UseCases.Employers.Posts.Commands.AddJobPost
{
    public class AddJobPostCommandHandler : IRequestHandler<AddJobPostCommand, ResponeAddPostDto>
    {
        private readonly IPostRepository _postRepository;
        private readonly ISearchFilter_PostRepository _searchFilter_PostRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAppUserRepository _appUserRepository;
        private readonly ISystemValuesRepository _systemValuesRepository;

        public AddJobPostCommandHandler(IPostRepository postRepository, ISearchFilter_PostRepository searchFilter_PostRepository, IUnitOfWork unitOfWork, IAppUserRepository appUserRepository, ISystemValuesRepository systemValuesRepository)
        {
            _postRepository = postRepository;
            _searchFilter_PostRepository = searchFilter_PostRepository;
            _unitOfWork = unitOfWork;
            _appUserRepository = appUserRepository;
            _systemValuesRepository = systemValuesRepository;
        }

        public async Task<ResponeAddPostDto> Handle(AddJobPostCommand request, CancellationToken cancellationToken)
        {

            try
            {
                //check user
                var fUser = await _appUserRepository.GetUserByIdAsync(request.UserId.Value);
                if (fUser == null)
                {
                    throw new UserNotFoundException("Bạn không có quyền đăng bài viết này.");
                }

                //nao dung permission o controller
                //if (fUser.RoleType == Entities.Enums.RoleType.Candidate)
                //{
                //    throw new ForbiddenAccessException();
                //}

                //check enddate
                DateTime nowDate = DateTime.Now;
                DateTime tomorrow = new DateTime(nowDate.Year, nowDate.Month, nowDate.Day + 1, 0, 0, 0, 0);
                DateTime endDate = new DateTime(request.EndDate.Year, request.EndDate.Month, request.EndDate.Day, 0, 0, 0, 0);


                //fee
                var postingFeePerDay = await _systemValuesRepository.GetJobPostPriceFeeDayAsync();
                var postingFee = ((endDate - tomorrow).Days + 1) * postingFeePerDay;

                if (postingFee < postingFeePerDay)
                {
                    throw new InvalidPostException.InvalidJobPostingException("Thời gian kết thúc bài đăng không hợp lệ.");
                }

                await _unitOfWork.BeginTransactionAsync();
                try
                {
                    fUser.AccountBalance -= postingFee;
                    await _appUserRepository.UpdateAccountBalanceAsync(request.UserId.Value, fUser.AccountBalance);
                }
                catch (InvalidBalanceException)
                {
                    throw new InvalidPostException.InvalidJobPostingException("Số dư tài khoản không đủ");
                }
                var postEntitiy = new Entities.Post()
                {
                    UserId = request.UserId.Value,
                    Title = request.Title,
                    ShortContent = "a",
                    Content = request.Content,
                    CreateAt = DateTime.Now,
                    UpdateAt = DateTime.Now,
                    PostType = Entities.Enums.PostType.JobPosting,
                    KeyWords = new List<string>(),
                    ViewCount = 0,
                    EndDate = new DateTime(endDate.Year, endDate.Month, endDate.Day, 23, 59, 59, 0),
                    PostingFee = postingFee,
                };

                //add post
                var resultAddPost = await _postRepository.AddJobPostAsync(request.UserId.Value, postEntitiy);

                //filter
                //nho lam validation sau nay(input, voi searchfilter phai ton tai trong csdl)
                foreach (var item in request.SearchFilterRanges)
                {
                    await _searchFilter_PostRepository.AddSearchFilter_Post(item.SearchFilterId, resultAddPost, item.Min + "_" + item.Max);
                }

                foreach (var item in request.SearchFilterCheckBoxs)
                {
                    await _searchFilter_PostRepository.AddSearchFilter_Post(item.SearchFilterId, resultAddPost, JsonConvert.SerializeObject(item.Values));
                }

                foreach (var item in request.SearchFilterComboboxs)
                {
                    await _searchFilter_PostRepository.AddSearchFilter_Post(item.SearchFilterId, resultAddPost, item.Value);
                }

                await _unitOfWork.CommitAsync();

                return new ResponeAddPostDto()
                {
                    PostId = resultAddPost,
                    AccountBalance = fUser.AccountBalance.ToString(),
                };
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }

        }
    }
}
