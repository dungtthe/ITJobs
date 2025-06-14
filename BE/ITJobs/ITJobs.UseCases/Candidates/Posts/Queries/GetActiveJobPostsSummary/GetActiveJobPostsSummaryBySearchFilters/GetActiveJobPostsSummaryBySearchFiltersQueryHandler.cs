using ITJobs.UseCases.Helpers.Paginations;
using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary.GetActiveJobPostsSummaryBySearchFilters
{
    public class GetActiveJobPostsSummaryBySearchFiltersQueryHandler : IRequestHandler<GetActiveJobPostsSummaryBySearchFiltersQuery, PagedResult<JobPostsSummaryDto>>
    {
        private readonly IPostRepository _postRepository;

        public GetActiveJobPostsSummaryBySearchFiltersQueryHandler(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        public async Task<PagedResult<JobPostsSummaryDto>> Handle(GetActiveJobPostsSummaryBySearchFiltersQuery request, CancellationToken cancellationToken)
        {
            return await _postRepository.GetActiveJobPostsSummaryBySearchFiltersForCandidateAsync(request);
        }
    }
}
