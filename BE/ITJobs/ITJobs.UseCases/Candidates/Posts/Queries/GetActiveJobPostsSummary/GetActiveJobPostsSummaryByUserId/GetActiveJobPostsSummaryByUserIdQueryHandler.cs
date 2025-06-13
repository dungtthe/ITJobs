using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary.GetActiveJobPostsSummaryByUserId
{
    public class GetActiveJobPostsSummaryByUserIdQueryHandler : IRequestHandler<GetActiveJobPostsSummaryByUserIdQuery, List<JobPostsSummaryDto>>
    {
        private readonly IPostRepository _postRepository;
        public GetActiveJobPostsSummaryByUserIdQueryHandler(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }
        public async Task<List<JobPostsSummaryDto>> Handle(GetActiveJobPostsSummaryByUserIdQuery request, CancellationToken cancellationToken)
        {
            return await _postRepository.GetActiveJobPostsSummaryByUserIdForCandidateAsync(request.UserId);
        }
    }
}
