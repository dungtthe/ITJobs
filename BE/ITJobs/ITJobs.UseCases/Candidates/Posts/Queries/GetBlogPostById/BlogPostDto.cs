using ITJobs.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Posts.Queries.GetBlogPostById
{
    public class BlogPostDto
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public long ViewCount { get; set; }

        //author
        public Guid UserId { get; set; }
        public string AuthorName { get; set; }
        public string AuthorAvatar { get; set; }


        public List<Reaction> Reactions { get; set; } = new List<Reaction>();
    }
}
