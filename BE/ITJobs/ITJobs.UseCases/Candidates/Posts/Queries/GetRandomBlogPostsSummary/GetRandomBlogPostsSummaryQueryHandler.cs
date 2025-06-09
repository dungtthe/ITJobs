using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Posts.Queries.GetRandomBlogPostsSummary
{
    public class GetRandomBlogPostsSummaryQueryHandler : IRequestHandler<GetRandomBlogPostsSummaryQuery, List<BlogPostSummaryDto>>
    {
        private readonly IPostRepository _postRepository;
        public GetRandomBlogPostsSummaryQueryHandler(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        public async Task<List<BlogPostSummaryDto>> Handle(GetRandomBlogPostsSummaryQuery request, CancellationToken cancellationToken)
        {
            return await _postRepository.GetRandomBlogPostsSummaryForCandidateAsync(request);
        }
    }
}
