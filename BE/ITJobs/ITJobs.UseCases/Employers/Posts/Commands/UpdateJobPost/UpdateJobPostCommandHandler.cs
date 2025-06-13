using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.Posts.Commands.UpdateJobPost
{
    public class UpdateJobPostCommandHandler : IRequestHandler<UpdateJobPostCommand, Unit>
    {
        private readonly IPostRepository _postRepository;
        private readonly ISearchFilter_PostRepository _searchFilter_PostRepository;
        private readonly IUnitOfWork _unitOfWork;
        public UpdateJobPostCommandHandler(IPostRepository postRepository, ISearchFilter_PostRepository searchFilter_PostRepository, IUnitOfWork unitOfWork)
        {
            _postRepository = postRepository;
            _searchFilter_PostRepository = searchFilter_PostRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(UpdateJobPostCommand request, CancellationToken cancellationToken)
        {
            try
            {
                if(!await _postRepository.IsPostOwnedByEmployerAsync(request.PostId, request.UserId.Value))
                {
                    throw new Entities.Exceptions.PostNotFoundException();
                }
                await _unitOfWork.BeginTransactionAsync();
                await _searchFilter_PostRepository.DeleteAllSearchFilterPostByPostId(request.PostId);
                await _postRepository.UpdateJobPostAsync(request.PostId, request.Title,request.Content);
                //filter
                //nho lam validation sau nay(input, voi searchfilter phai ton tai trong csdl)
                foreach (var item in request.SearchFilterRanges)
                {
                    await _searchFilter_PostRepository.AddSearchFilter_Post(item.SearchFilterId, request.PostId, item.Min + "_" + item.Max);
                }

                foreach (var item in request.SearchFilterCheckBoxs)
                {
                    await _searchFilter_PostRepository.AddSearchFilter_Post(item.SearchFilterId, request.PostId, JsonConvert.SerializeObject(item.Values));
                }

                foreach (var item in request.SearchFilterComboboxs)
                {
                    await _searchFilter_PostRepository.AddSearchFilter_Post(item.SearchFilterId, request.PostId, item.Value);
                }
                await _unitOfWork.CommitAsync();
                return Unit.Value;
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
