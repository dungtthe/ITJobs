using ITJobs.Entities;
using ITJobs.Entities.Enums;
using ITJobs.UseCases.Admins.Posts.Queries.GetBlogPostsSummary;
using ITJobs.UseCases.Admins.Posts.Queries.GetJobPostsSummary;
using ITJobs.UseCases.Candidates.Posts.Queries.GetBlogPostById;
using ITJobs.UseCases.Candidates.Posts.Queries.GetRandomBlogPostsSummary;
using ITJobs.UseCases.Employers.Posts.Queries.GetJobPostById;
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

            var postIds = await query
                .OrderByDescending(p => p.CreatedAt)
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(p => p.Id)
                .ToListAsync();

            var applicationCounts = await _dbContext.JobApplications
                .Where(ja => postIds.Contains(ja.PostId))
                .GroupBy(ja => ja.PostId)
                .Select(g => new
                {
                    PostId = g.Key,
                    Count = g.Count()
                })
                .ToDictionaryAsync(x => x.PostId, x => x.Count);

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
                    JobApplicationCount = 0,
                    UserId = p.UserId,
                    AuthorName = p.User.FullName,
                    AuthorAvatar = p.User.Image
                })
                .ToListAsync();

            foreach (var item in items)
            {
                item.JobApplicationCount = applicationCounts.GetValueOrDefault(item.Id, 0);
            }

            return new PagedResult<UseCases.Admins.Posts.Queries.GetJobPostsSummary.JobPostSummaryDto>
            {
                Items = items,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                TotalPages = totalPages,
                TotalRecords = totalRecords
            };
        }

        public async Task<PagedResult<UseCases.Candidates.Posts.Queries.GetBlogPostsSummary.BlogPostSummaryDto>> GetBlogPostsSummaryForCandidateAsync(UseCases.Candidates.Posts.Queries.GetBlogPostsSummary.GetBlogPostsSummaryQuery request)
        {
            var query = _dbContext.Posts
                                       .Include(p => p.User)
                                       .Where(p => p.PostType == PostType.News);

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
                .Select(p => new UseCases.Candidates.Posts.Queries.GetBlogPostsSummary.BlogPostSummaryDto
                {
                    Id = p.Id,
                    MainImage = p.MainImage,
                    Title = p.Title,
                    ShortContent = p.ShortContent,
                })
                .ToListAsync();

            return new PagedResult<UseCases.Candidates.Posts.Queries.GetBlogPostsSummary.BlogPostSummaryDto>
            {
                Items = items,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                TotalPages = totalPages,
                TotalRecords = totalRecords
            };
        }

        public async Task<List<UseCases.Candidates.Posts.Queries.GetRandomBlogPostsSummary.BlogPostSummaryDto>> GetRandomBlogPostsSummaryForCandidateAsync(GetRandomBlogPostsSummaryQuery request)
        {
            var query = _dbContext.Posts
                .Where(p => p.PostType == PostType.News && !p.IsDeleted);

            if (request.ExcludeId.HasValue)
            {
                query = query.Where(p => p.Id != request.ExcludeId.Value);
            }

            var totalPosts = await query.CountAsync();

            if (totalPosts == 0)
            {
                return new List<UseCases.Candidates.Posts.Queries.GetRandomBlogPostsSummary.BlogPostSummaryDto>();
            }

            var randomPosts = await query
                .OrderBy(p => Guid.NewGuid()) 
                .Take(request.Count)
                .Select(p => new UseCases.Candidates.Posts.Queries.GetRandomBlogPostsSummary.BlogPostSummaryDto
                {
                    Id = p.Id,
                    MainImage = p.MainImage,
                    Title = p.Title,
                    ShortContent = p.ShortContent
                })
                .ToListAsync();

            return randomPosts;
        }

        public async Task<ITJobs.UseCases.Candidates.Posts.Queries.GetBlogPostById.BlogPostDto> GetBlogPostByIdForCandidate(ITJobs.UseCases.Candidates.Posts.Queries.GetBlogPostById.GetBlogPostByIdQuery request)
        {
            var post = await _dbContext.Posts.Include(p => p.User).FirstOrDefaultAsync(p => p.Id == request.Id && p.PostType == PostType.News && !p.IsDeleted);
            if(post == null)
            {
                return null;
            }

            return new ITJobs.UseCases.Candidates.Posts.Queries.GetBlogPostById.BlogPostDto
            {
                Id = post.Id,
                Content = post.Content,
                CreateAt = post.CreatedAt,
                UpdateAt = post.UpdatedAt,
                ViewCount = post.ViewCount,

                UserId = post.UserId,
                AuthorName = post.User.FullName,
                AuthorAvatar = post.User.Image
            };
        }

        public async Task<PagedResult<UseCases.Employers.Posts.Queries.GetJobPostsSummary.JobPostSummaryDto>> GetJobPostsSummaryForEmployerAsync(UseCases.Employers.Posts.Queries.GetJobPostsSummary.GetJobPostsSummaryQuery request)
        {
            var query = _dbContext.Posts
                            .Include(p => p.User)
                            .Where(p => p.PostType == PostType.JobPosting && p.UserId == request.UserId.Value && !p.IsDeleted);
          
            if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            {
                query = query.Where(p =>
                    p.Title.ToLower().Contains(request.SearchTerm.ToLower()));
            }

            var totalRecords = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalRecords / (double)request.PageSize);

            var postIds = await query
                .OrderByDescending(p => p.CreatedAt)
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(p => p.Id)
                .ToListAsync();

            var applicationCounts = await _dbContext.JobApplications
                .Where(ja => postIds.Contains(ja.PostId))
                .GroupBy(ja => ja.PostId)
                .Select(g => new
                {
                    PostId = g.Key,
                    Count = g.Count()
                })
                .ToDictionaryAsync(x => x.PostId, x => x.Count);

            var items = await query
                .OrderByDescending(p => p.CreatedAt)
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(p => new UseCases.Employers.Posts.Queries.GetJobPostsSummary.JobPostSummaryDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    CreateAt = p.CreatedAt,
                    EndDate = p.EndDate.Value,
                    ViewCount = p.ViewCount,
                    PostingFee = p.PostingFee.ToString(),
                    JobApplicationCount = 0,
                })
                .ToListAsync();

            foreach (var item in items)
            {
                item.JobApplicationCount = applicationCounts.GetValueOrDefault(item.Id, 0);
            }

            return new PagedResult<UseCases.Employers.Posts.Queries.GetJobPostsSummary.JobPostSummaryDto>
            {
                Items = items,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                TotalPages = totalPages,
                TotalRecords = totalRecords
            };
        }

        public async Task<bool> IsPostOwnedByEmployerAsync(Guid postId, Guid userId)
        {
            return await _dbContext.Posts.AnyAsync(p=>p.Id==postId && p.UserId==userId && !p.IsDeleted);
        }

        public async Task UpdateJobPostAsync(Guid postId, string title, string content)
        {
            var post = await _dbContext.Posts.FindAsync(postId);
            if (post == null)
            {
                throw new Entities.Exceptions.PostNotFoundException();
            }

            post.Title = title;
            post.Content = content;
            post.UpdatedAt = DateTime.Now;
        }

        public async Task<UseCases.Employers.Posts.Queries.GetJobPostById.JobPostDto> GetJobPostByIdAsync(Guid postId)
        {
            var post = await _dbContext.Posts.Where(p => p.Id == postId && !p.IsDeleted).FirstOrDefaultAsync();
            if (post == null)
            {
                throw new Entities.Exceptions.PostNotFoundException();
            }

            return new JobPostDto()
            {
                Id= post.Id,
                Title= post.Title,
                Content= post.Content,
                CreateAt = post.CreatedAt,
                UpdateAt= post.UpdatedAt,
                EndDate = post.EndDate.Value,
                ViewCount = post.ViewCount,
                PostingFee = post.PostingFee.ToString()
            };
        }
    }
}
