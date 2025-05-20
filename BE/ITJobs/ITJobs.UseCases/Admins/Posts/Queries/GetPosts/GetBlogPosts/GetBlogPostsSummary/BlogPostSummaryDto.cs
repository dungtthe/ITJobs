using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.Posts.Queries.GetPosts.GetBlogPosts.GetBlogPostsSummary
{
    public class BlogPostSummaryDto
    {
        public Guid Id { get; set; }
        public string MainImage { get; set; }
        public string Title { get; set; }
        public string AuthorName { get; set; }
        public DateTime CreateAt { get; set; }
        public long ViewCount { get;set; }
        public string ShortContent { get; set; }
        public bool IsDeleted { get; set; }
    }
}
