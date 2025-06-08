using ITJobs.UseCases.Helpers.Paginations;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.Posts.Queries.GetBlogPostsSummary
{
    public class GetBlogPostsSummaryQuery : BasePaginationParameters, IRequest<PagedResult<BlogPostSummaryDto>>
    {
        public Guid?UserId { get; set; } // loc theo cong ty
    }
}
