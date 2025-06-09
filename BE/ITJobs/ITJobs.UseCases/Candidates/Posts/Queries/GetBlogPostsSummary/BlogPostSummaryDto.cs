using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Posts.Queries.GetBlogPostsSummary
{
    public class BlogPostSummaryDto
    {
        public Guid Id { get; set; }
        public string MainImage { get; set; }
        public string Title { get; set; }
        public string ShortContent { get; set; }
    }
}
