using ITJobs.UseCases.Helpers.Paginations;
using ITJobs.UseCases.Interfaces.ExternalServices;
using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Posts.Queries.GetBlogPostsSummary
{
    public class GetBlogPostsSummaryQueryHandler : IRequestHandler<GetBlogPostsSummaryQuery, PagedResult<BlogPostSummaryDto>>
    {
        private readonly IPostRepository _postRepository;

        public GetBlogPostsSummaryQueryHandler(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        public async Task<PagedResult<BlogPostSummaryDto>> Handle(GetBlogPostsSummaryQuery request, CancellationToken cancellationToken)
        {
            return await _postRepository.GetBlogPostsSummaryForCandidateAsync(request);
        }
    }
}
