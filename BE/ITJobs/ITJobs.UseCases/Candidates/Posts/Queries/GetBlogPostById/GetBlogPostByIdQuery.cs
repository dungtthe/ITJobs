using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Posts.Queries.GetBlogPostById
{
    public class GetBlogPostByIdQuery:IRequest<BlogPostDto>
    {
        public Guid Id { get; set; }
    }
}
