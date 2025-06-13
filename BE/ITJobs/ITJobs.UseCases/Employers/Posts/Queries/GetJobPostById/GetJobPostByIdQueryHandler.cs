using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.Posts.Queries.GetJobPostById
{
    public class GetJobPostByIdQueryHandler:IRequestHandler<GetJobPostByIdQuery, JobPostDto>
    {
        private readonly IPostRepository _postRepository;
        private readonly ISearchFilter_PostRepository _searchFilter_PostRepository;
        public GetJobPostByIdQueryHandler(IPostRepository postRepository, ISearchFilter_PostRepository searchFilter_PostRepository)
        {
            _postRepository = postRepository;
            _searchFilter_PostRepository = searchFilter_PostRepository;
        }
        public async Task<JobPostDto> Handle(GetJobPostByIdQuery request, CancellationToken cancellationToken)
        {
            if (!await _postRepository.IsPostOwnedByEmployerAsync(request.PostId, request.UserId.Value))
            {
                throw new Entities.Exceptions.PostNotFoundException();
            }

            var jobPost = await _postRepository.GetJobPostByIdAsync(request.PostId);

            var searchFilterPosts = await _searchFilter_PostRepository.GetSearchFiltersByPostId(request.PostId);
            foreach(var searchFilter in searchFilterPosts)
            {
                if(searchFilter.SearchFilterType == Entities.Enums.SearchFilterType.Combobox)
                {
                    var searchFilterCombo = (Entities.SearchFilterCombobox)searchFilter;
                    jobPost.SearchFilterComboboxs.Add(new JobPostDto.SearchFilterComboboxDto()
                    {
                        SearchFilterId = searchFilterCombo.Id,
                        Value = searchFilterCombo.Values[0]
                    });
                }
                else if(searchFilter.SearchFilterType == Entities.Enums.SearchFilterType.Checkbox)
                {
                    var searchFilterCheck = (Entities.SearchFilterCheckBox)searchFilter;
                    jobPost.SearchFilterCheckBoxs.Add(new JobPostDto.SearchFilterCheckBoxDto()
                    {
                        SearchFilterId = searchFilterCheck.Id,
                        Values = searchFilterCheck.Values
                    });
                }
                else
                {
                    var searchFilterRange = (Entities.SearchFilterRange)searchFilter;
                    jobPost.SearchFilterRanges.Add(new JobPostDto.SearchFilterRangeDto()
                    {
                        SearchFilterId = searchFilterRange.Id,
                        Min = searchFilterRange.Min.ToString(),
                        Max = searchFilterRange.Max.ToString(),
                       
                    });
                }
            }

            return jobPost;
        }
    }
}
