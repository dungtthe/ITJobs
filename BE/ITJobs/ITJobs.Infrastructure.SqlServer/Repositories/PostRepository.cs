using ITJobs.Entities;
using ITJobs.Entities.Enums;
using ITJobs.UseCases.Admins.Posts.Queries.GetBlogPostsSummary;
using ITJobs.UseCases.Admins.Posts.Queries.GetJobPostsSummary;
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

        public async Task<PagedResult<UseCases.Admins.Posts.Queries.GetBlogPostsSummary.BlogPostSummaryDto>> GetBlogPostsSummarForAdminAsync(GetBlogPostsSummaryQuery request)
        {
            var query = _dbContext.Posts
                                        .Include(p=>p.User)
                                        .Where(p => p.PostType == PostType.News);
            if (request.UserId != null)
            {
                query = query.Where(p => p.UserId == request.UserId);
            }

            if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            {
                query = query.Where(p =>
                    p.User.FullName.ToLower().Contains(request.SearchTerm.ToLower()) ||
                    p.Title.ToLower().Contains(request.SearchTerm.ToLower()) ||
                    p.ShortContent.ToLower().Contains(request.SearchTerm.ToLower()));
            }

            var totalRecords = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalRecords / (double)request.PageSize);

            var items = await query
                .OrderByDescending(p => p.CreatedAt) 
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(p => new UseCases.Admins.Posts.Queries.GetBlogPostsSummary.BlogPostSummaryDto
                {
                    Id = p.Id,
                    MainImage = p.MainImage,
                    Title = p.Title,
                    CreateAt = p.CreatedAt,
                    UpdateAt = p.UpdatedAt,
                    ViewCount = p.ViewCount,
                    ShortContent = p.ShortContent,
                    IsDeleted = p.IsDeleted,

                    UserId = p.UserId,
                    AuthorName = p.User.FullName,
                    AuthorAvatar = p.User.Image
                })
                .ToListAsync();

            return new PagedResult<UseCases.Admins.Posts.Queries.GetBlogPostsSummary.BlogPostSummaryDto>
            {
                Items = items,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                TotalPages = totalPages,
                TotalRecords = totalRecords
            };
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

        public async Task<Guid> AddJobPostAsync(Guid userId, Post postEntity)
        {

            var post = new Models.Post()
            {
                Id = postEntity.Id,
                UserId = userId,
                Title = postEntity.Title,
                Content = postEntity.Content,
                ShortContent = postEntity.ShortContent,
                MainImage = postEntity.MainImage,
                Keywords = JsonConvert.SerializeObject(postEntity.KeyWords),
                CreatedAt = postEntity.CreateAt,
                UpdatedAt = postEntity.UpdateAt,
                PostType = postEntity.PostType,
                IsDeleted = postEntity.IsDeleted,
                ViewCount = postEntity.ViewCount,
                EndDate= postEntity.EndDate,
                PostingFee= postEntity.PostingFee
            };

            await _dbContext.Posts.AddAsync(post);
            return post.Id;
        }

        public async Task<PagedResult<UseCases.Admins.Posts.Queries.GetJobPostsSummary.JobPostSummaryDto>> GetJobPostsSummarForAdminAsync(UseCases.Admins.Posts.Queries.GetJobPostsSummary.GetJobPostsSummaryQuery request)
        {
            var query = _dbContext.Posts
                            .Include(p => p.User)
                            .Where(p => p.PostType == PostType.JobPosting);
            if (request.UserId != null)
            {
                query = query.Where(p => p.UserId == request.UserId);
            }

            if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            {
                query = query.Where(p =>
                    p.User.FullName.ToLower().Contains(request.SearchTerm.ToLower()) ||
                    p.Title.ToLower().Contains(request.SearchTerm.ToLower()));
            }

            var totalRecords = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalRecords / (double)request.PageSize);

            var items = await query
                .OrderByDescending(p => p.CreatedAt)
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(p => new UseCases.Admins.Posts.Queries.GetJobPostsSummary.JobPostSummaryDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    CreateAt = p.CreatedAt,
                    UpdateAt = p.UpdatedAt,
                    EndDate = p.EndDate.Value,
                    ViewCount = p.ViewCount,
                    IsDeleted = p.IsDeleted,
                    PostingFee = p.PostingFee.ToString(),

                    UserId = p.UserId,
                    AuthorName = p.User.FullName,
                    AuthorAvatar = p.User.Image
                })
                .ToListAsync();

            return new PagedResult<UseCases.Admins.Posts.Queries.GetJobPostsSummary.JobPostSummaryDto>
            {
                Items = items,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                TotalPages = totalPages,
                TotalRecords = totalRecords
            };
        }
    }
}
