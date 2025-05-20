using ITJobs.UseCases.Admins.Posts.Queries.GetPosts.GetBlogPosts.GetBlogPostsSummary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.Repositories
{
    public interface IPostRepository
    {
        Task AddBlogPostAsync(Guid userId,Entities.Post postEntity);
        Task<List<BlogPostSummaryDto>> GetBlogPostsSummarAsync();
    }
}
