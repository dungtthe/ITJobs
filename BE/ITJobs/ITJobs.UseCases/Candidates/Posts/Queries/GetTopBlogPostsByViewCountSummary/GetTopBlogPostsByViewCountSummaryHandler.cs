using ITJobs.UseCases.Helpers.Paginations;
using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Posts.Queries.GetTopBlogPostsByViewCountSummary
{
    public class GetTopBlogPostsByViewCountSummaryHandler : IRequestHandler<GetTopBlogPostsByViewCountSummaryQuery, PagedResult<BlogPostSummaryDto>>
    {
        private readonly IPostRepository _postRepository;
        public GetTopBlogPostsByViewCountSummaryHandler(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }
        public async Task<PagedResult<BlogPostSummaryDto>> Handle(GetTopBlogPostsByViewCountSummaryQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var result = await _postRepository.GetTopBlogPostsByViewCountAsync(request.PageNumber, request.PageSize);
                return result;
            }
            catch
            {
                throw;
            }
        }
    }
}
