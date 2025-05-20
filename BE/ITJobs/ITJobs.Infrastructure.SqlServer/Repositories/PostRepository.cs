using ITJobs.Entities;
using ITJobs.UseCases.Interfaces.Repositories;
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
    }
}
