using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.Posts.Commands.AddJobPost
{
    public class AddJobPostCommandHandler : IRequestHandler<AddJobPostCommand, Guid>
    {
        private readonly IPostRepository _postRepository;
        private readonly ISearchFilter_PostRepository _searchFilter_PostRepository;
        private readonly IUnitOfWork _unitOfWork;

        public AddJobPostCommandHandler(IPostRepository postRepository, ISearchFilter_PostRepository searchFilter_PostRepository, IUnitOfWork unitOfWork)
        {
            _postRepository = postRepository;
            _searchFilter_PostRepository = searchFilter_PostRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Guid> Handle(AddJobPostCommand request, CancellationToken cancellationToken)
        {

            try
            {
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
                    EndDate = DateTime.Now.AddDays(10),//tam thoi nhu nay da
                    PostingFee = 0,//tam thoi nhu nay da
                };


                await _unitOfWork.BeginTransactionAsync();
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

                return resultAddPost;
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }

        }
    }
}
