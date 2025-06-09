using ITJobs.UseCases.Helpers.Paginations;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Posts.Queries.GetBlogPostsSummary
{
    public class GetBlogPostsSummaryQuery : BasePaginationParameters, IRequest<PagedResult<BlogPostSummaryDto>>
    {

    }
}
