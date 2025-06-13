using ITJobs.UseCases.Helpers.Paginations;
using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.Posts.Queries.GetJobPostsSummary
{
    public class GetJobPostsSummaryQueryHandler : IRequestHandler<GetJobPostsSummaryQuery, PagedResult<JobPostSummaryDto>>
    {
        private readonly IPostRepository _postRepository;
        public GetJobPostsSummaryQueryHandler(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }
        public async Task<PagedResult<JobPostSummaryDto>> Handle(GetJobPostsSummaryQuery request, CancellationToken cancellationToken)
        {
            return await _postRepository.GetJobPostsSummaryForEmployerAsync(request);
        }
    }
}
