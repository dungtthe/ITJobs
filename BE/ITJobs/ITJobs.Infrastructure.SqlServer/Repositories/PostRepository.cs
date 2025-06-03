using ITJobs.Entities;
using ITJobs.Entities.Enums;
using ITJobs.UseCases.Admins.Posts.Queries.GetBlogPostsSummary;
using ITJobs.UseCases.Helpers.Paginations;
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

        public async Task<List<Guid>> GetEmployerIdsByPostIdsAsync(List<Guid> postIds)
        {
            var employerIds = await _dbContext.Posts
                .Where(p => postIds.Contains(p.Id) && !p.IsDeleted)
                .Select(p => p.UserId)
                .Distinct() 
                .ToListAsync();

            return employerIds;
        }

        public async Task<List<Guid>> GetTopEmployersByPostTypeAsync(PostType postType, int count)
        {
            var topEmployers = await _dbContext.Posts
                .Where(p => p.PostType == postType && !p.IsDeleted)
                .GroupBy(p => p.UserId)
                .Select(g => new
                {
                    EmployerId = g.Key,
                    PostCount = g.Count()
                })
                .OrderByDescending(g => g.PostCount) 
                .Take(count)
                .Select(g => g.EmployerId)
                .ToListAsync();

            return topEmployers;
        }

        public async Task<int> CountActiveJobPostsByEmployerIdAsync(Guid employerId)
        {
            var now = DateTime.Now;
            return await _dbContext.Posts
                .CountAsync(p => p.UserId == employerId
                             && p.PostType == PostType.JobPosting
                             && !p.IsDeleted
                             && (p.EndDate == null || p.EndDate > now)); 
        }


        public async Task<PagedResult<ITJobs.UseCases.Candidates.Posts.Queries.GetTopBlogPostsByViewCountSummary.BlogPostSummaryDto>> GetTopBlogPostsByViewCountAsync(int pageNumber, int pageSize)
        {
            var totalRecords = await _dbContext.Posts
                .Where(p => p.PostType == PostType.News && !p.IsDeleted)
                .CountAsync();

            var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

            var items = await _dbContext.Posts
                .Where(p => p.PostType == PostType.News && !p.IsDeleted)
                .OrderByDescending(p => p.ViewCount)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new ITJobs.UseCases.Candidates.Posts.Queries.GetTopBlogPostsByViewCountSummary.BlogPostSummaryDto
                {
                    Id = p.Id,
                    MainImage = p.MainImage,
                    Title = p.Title,
                    ShortContent = p.ShortContent
                })
                .ToListAsync();

            return new PagedResult<ITJobs.UseCases.Candidates.Posts.Queries.GetTopBlogPostsByViewCountSummary.BlogPostSummaryDto>
            {
                Items = items,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalPages = totalPages,
                TotalRecords = totalRecords
            };
        }
    }
}
