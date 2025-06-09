using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Posts.Queries.GetRandomBlogPostsSummary
{
    public class GetRandomBlogPostsSummaryQuery:IRequest<List<BlogPostSummaryDto>>
    {
        public Guid? ExcludeId { get; set; }
        public int Count { get; set; } = 5; 
    }
}
