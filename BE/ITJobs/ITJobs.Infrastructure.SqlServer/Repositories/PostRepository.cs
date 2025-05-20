using ITJobs.Entities;
using ITJobs.UseCases.Admins.Posts.Queries.GetPosts.GetBlogPosts.GetBlogPostsSummary;
using ITJobs.UseCases.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly ITJobsDbContext _dbContext;
        public PostRepository(ITJobsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddBlogPostAsync(Guid userId, Entities.Post postEntity)
        {
            await _dbContext.Posts.AddAsync(new Models.Post()
            {
                Id= postEntity.Id,
                Title = postEntity.Title,
                Content = postEntity.Content,
                ShortContent = postEntity.ShortContent,
                MainImage = postEntity.MainImage,
                Keywords= JsonConvert.SerializeObject(postEntity.KeyWords),
                CreatedAt = postEntity.CreateAt,
                UpdatedAt = postEntity.UpdateAt,
                UserId = userId,
                PostType = postEntity.PostType,
                IsDeleted= postEntity.IsDeleted,
                ViewCount= postEntity.ViewCount
            });
        }

        public async Task<List<BlogPostSummaryDto>> GetBlogPostsSummarAsync()
        {
            var posts = await _dbContext.Posts
                                            .Select(p => new BlogPostSummaryDto
                                            {
                                                Id = p.Id,
                                                MainImage = p.MainImage,
                                                Title = p.Title,
                                                AuthorName = p.User.FullName,
                                                CreateAt = p.CreatedAt,
                                                ViewCount = p.ViewCount,
                                                ShortContent = p.ShortContent,
                                                IsDeleted=p.IsDeleted
                                            })
                                            .ToListAsync();

            return posts;
        }
    }
}
