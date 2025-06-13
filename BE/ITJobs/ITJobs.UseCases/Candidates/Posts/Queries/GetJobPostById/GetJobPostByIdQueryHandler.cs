using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Posts.Queries.GetJobPostById
{
    public class GetJobPostByIdQueryHandler:IRequestHandler<GetJobPostByIdQuery, JobPostDto>
    {
        private readonly IPostRepository _postRepository;
        private readonly ISearchFilter_PostRepository _searchFilterPostRepository;
        public GetJobPostByIdQueryHandler(IPostRepository postRepository, ISearchFilter_PostRepository searchFilterPostRepository)
        {
            _postRepository = postRepository ?? throw new ArgumentNullException(nameof(postRepository));
            _searchFilterPostRepository = searchFilterPostRepository;
        }

        public async Task<JobPostDto> Handle(GetJobPostByIdQuery request, CancellationToken cancellationToken)
        {
            var jobPost = await _postRepository.GetJobPostByIdForCandidateAsync(request.PostId);
            var searchFilter_Post_s = await _searchFilterPostRepository.GetSearchFiltersByPostId(request.PostId);
            foreach (var searchFilter in searchFilter_Post_s)
            {
                if(searchFilter.Id == ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_CITY
                    || searchFilter.Id == ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_WORK_TYPE
                    || searchFilter.Id == ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_SKILL)
                {
                    continue;
                }

                if (searchFilter.SearchFilterType == Entities.Enums.SearchFilterType.Combobox)
                {
                    jobPost.SearchFilterComboboxs.Add((Entities.SearchFilterCombobox)searchFilter);
                    
                }
                else if (searchFilter.SearchFilterType == Entities.Enums.SearchFilterType.Checkbox)
                {
                     jobPost.SearchFilterCheckBoxs.Add((Entities.SearchFilterCheckBox)searchFilter);
                   
                }
                else
                {
                      jobPost.SearchFilterRanges.Add((Entities.SearchFilterRange)searchFilter);
                    
                }
            }
            return jobPost;
        }
    }
}
