using ITJobs.UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary.GetActiveJobPostsSummaryByUserId;
using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary.GetActiveJobPostsRandomSummary
{
    public class GetActiveJobPostsRandomSummaryQueryHandler : IRequestHandler<GetActiveJobPostsRandomSummaryQuery, List<JobPostsSummaryDto>>
    {
        private readonly IPostRepository _postRepository;
        public GetActiveJobPostsRandomSummaryQueryHandler(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }
        public async Task<List<JobPostsSummaryDto>> Handle(GetActiveJobPostsRandomSummaryQuery request, CancellationToken cancellationToken)
        {
            if (request.Count <= 0)
            {
                return new List<JobPostsSummaryDto>();
            }
            return await _postRepository.GetActiveJobPostsSummaryRandomForCandidateAsync(request.ExcludePostId,request.Count);
        }
    }
}
