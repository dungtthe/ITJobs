using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.Posts.Queries.GetPosts.GetBlogPosts.GetBlogPostsSummary
{
    public class GetBlogPostsSummaryQuery: IRequest<List<BlogPostSummaryDto>>
    {
    }
}
