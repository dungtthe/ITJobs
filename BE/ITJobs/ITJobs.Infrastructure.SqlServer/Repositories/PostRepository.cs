using Azure.Core;
using ITJobs.Entities;
using ITJobs.Entities.Enums;
using ITJobs.Infrastructure.SqlServer.Models;
using ITJobs.UseCases.Admins.Posts.Queries.GetBlogPostsSummary;
using ITJobs.UseCases.Admins.Posts.Queries.GetJobPostsSummary;
using ITJobs.UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary;
using ITJobs.UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary.GetActiveJobPostsSummaryBySearchFilters;
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
using System.Threading;
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
                Id = postEntity.Id,
                Title = postEntity.Title,
                Content = postEntity.Content,
                ShortContent = postEntity.ShortContent,
                MainImage = postEntity.MainImage,
                Keywords = JsonConvert.SerializeObject(postEntity.KeyWords),
                CreatedAt = postEntity.CreateAt,
                UpdatedAt = postEntity.UpdateAt,
                UserId = userId,
                PostType = postEntity.PostType,
                IsDeleted = postEntity.IsDeleted,
                ViewCount = postEntity.ViewCount
            });
        }

        public async Task<PagedResult<UseCases.Admins.Posts.Queries.GetBlogPostsSummary.BlogPostSummaryDto>> GetBlogPostsSummarForAdminAsync(GetBlogPostsSummaryQuery request)
        {
            var query = _dbContext.Posts
                                        .Include(p => p.User)
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

        public async Task<Guid> AddJobPostAsync(Guid userId, Entities.Post postEntity)
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
                EndDate = postEntity.EndDate,
                PostingFee = postEntity.PostingFee
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
            if (post == null)
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
                AuthorAvatar = post.User.Image,

                Reactions = JsonConvert.DeserializeObject<List<Entities.Reaction>>(post.ReactionType_UserId_Ids)
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
            return await _dbContext.Posts.AnyAsync(p => p.Id == postId && p.UserId == userId && !p.IsDeleted);
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
                Id = post.Id,
                Title = post.Title,
                Content = post.Content,
                CreateAt = post.CreatedAt,
                UpdateAt = post.UpdatedAt,
                EndDate = post.EndDate.Value,
                ViewCount = post.ViewCount,
                PostingFee = post.PostingFee.ToString()
            };
        }

        public async Task<List<UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary.JobPostsSummaryDto>> GetActiveJobPostsSummaryByUserIdForCandidateAsync(Guid userId)
        {
            var result = new List<UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary.JobPostsSummaryDto>();
            var now = DateTime.Now;

            var activeJosPosts = await _dbContext.Posts.Include(p => p.User).Where(p => p.UserId == userId
                                                            && !p.IsDeleted
                                                            && p.PostType == Entities.Enums.PostType.JobPosting && p.EndDate > now).ToListAsync();
            foreach (var item in activeJosPosts)
            {
                var searchFilterPostWorkType = await _dbContext.SearchFilter_Posts.Where(s => s.PostId == item.Id && s.SearchFilterId == ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_WORK_TYPE).FirstOrDefaultAsync();
                var searchFilterPostLocation = await _dbContext.SearchFilter_Posts.Where(s => s.PostId == item.Id && s.SearchFilterId == ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_CITY).FirstOrDefaultAsync();
                var searchFilterPostSkill = await _dbContext.SearchFilter_Posts.Where(s => s.PostId == item.Id && s.SearchFilterId == ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_SKILL).FirstOrDefaultAsync();


                var jobSummary = new UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary.JobPostsSummaryDto()
                {
                    UserId = item.UserId,
                    CompanyName = item.User.FullName,
                    Image = item.User.Image,

                    PostId = item.Id,
                    Title = item.Title,
                    CreateAt = item.CreatedAt,
                };
                if (searchFilterPostWorkType != null)
                {
                    jobSummary.WorkTypes = JsonConvert.DeserializeObject<List<string>>(searchFilterPostWorkType.Values);
                }
                if (searchFilterPostLocation != null)
                {
                    jobSummary.LocationNames = JsonConvert.DeserializeObject<List<string>>(searchFilterPostLocation.Values);
                }
                if (searchFilterPostSkill != null)
                {
                    jobSummary.Skills = JsonConvert.DeserializeObject<List<string>>(searchFilterPostSkill.Values);
                }
                result.Add(jobSummary);
            }
            return result;
        }

        public async Task<UseCases.Candidates.Posts.Queries.GetJobPostById.JobPostDto> GetJobPostByIdForCandidateAsync(Guid postId)
        {
            var fPost = await _dbContext.Posts.Include(p => p.User).FirstOrDefaultAsync(p => p.Id == postId && !p.IsDeleted && p.PostType == PostType.JobPosting && p.EndDate > DateTime.Now);
            if (fPost == null)
            {
                throw new Entities.Exceptions.PostNotFoundException();
            }

            var fEmployer = await _dbContext.Employers.FirstOrDefaultAsync(e => e.UserId == fPost.UserId);
            if (fEmployer == null)
            {
                throw new Entities.Exceptions.UserNotFoundException();
            }

            var searchFilterPostWorkType = await _dbContext.SearchFilter_Posts.Where(s => s.PostId == postId && s.SearchFilterId == ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_WORK_TYPE).FirstOrDefaultAsync();
            var searchFilterPostLocation = await _dbContext.SearchFilter_Posts.Where(s => s.PostId == postId && s.SearchFilterId == ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_CITY).FirstOrDefaultAsync();
            var searchFilterPostSkill = await _dbContext.SearchFilter_Posts.Where(s => s.PostId == postId && s.SearchFilterId == ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_SKILL).FirstOrDefaultAsync();

            var jobPost = new UseCases.Candidates.Posts.Queries.GetJobPostById.JobPostDto()
            {
                Id = fPost.Id,
                Title = fPost.Title,
                Content = fPost.Content,
                CreateAt = fPost.CreatedAt,
                EndDate = fPost.EndDate.Value,
            };

            if (searchFilterPostWorkType != null)
            {
                jobPost.WorkTypes = JsonConvert.DeserializeObject<List<string>>(searchFilterPostWorkType.Values);
            }
            if (searchFilterPostLocation != null)
            {
                jobPost.LocationNames = JsonConvert.DeserializeObject<List<string>>(searchFilterPostLocation.Values);
            }
            if (searchFilterPostSkill != null)
            {
                jobPost.Skills = JsonConvert.DeserializeObject<List<string>>(searchFilterPostSkill.Values);
            }


            //employer 
            jobPost.UserId = fPost.UserId;
            jobPost.CompanyName = fPost.User.FullName;
            jobPost.CompanyImage = fPost.User.Image;
            jobPost.GeneralInfo = JsonConvert.DeserializeObject<List<Entities.GeneralInfoItem>>(fEmployer.GeneralInfo);

            //review
            var reviews = await _dbContext.Reviews
                                            .Where(r => r.EmployerId == fEmployer.Id)
                                            .Select(r => new { r.RatingType, r.IsRecommend })
                                            .ToListAsync();

            jobPost.TotalReviews = reviews.Count;
            jobPost.TotalRecommended = reviews.Count(r => r.IsRecommend);
            jobPost.AverageRating = reviews.Count > 0 ? (float)reviews.Average(r => (int)r.RatingType) : 0;
            return jobPost;
        }

        public async Task<List<UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary.JobPostsSummaryDto>> GetActiveJobPostsSummaryRandomForCandidateAsync(Guid? excludePostId, int count)
        {
            var now = DateTime.Now;

            var query = _dbContext.Posts
                .Include(p => p.User)
                .Where(p => !p.IsDeleted
                            && p.PostType == Entities.Enums.PostType.JobPosting
                            && p.EndDate > now);

            if (excludePostId.HasValue)
            {
                query = query.Where(p => p.Id != excludePostId.Value);
            }

            var activeJobPosts = await query
                .OrderBy(p => Guid.NewGuid())
                .Take(count)
                .ToListAsync();

            var result = new List<UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary.JobPostsSummaryDto>();

            foreach (var item in activeJobPosts)
            {
                var searchFilterPostWorkType = await _dbContext.SearchFilter_Posts
                    .Where(s => s.PostId == item.Id
                                && s.SearchFilterId == ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_WORK_TYPE)
                    .FirstOrDefaultAsync();

                var searchFilterPostLocation = await _dbContext.SearchFilter_Posts
                    .Where(s => s.PostId == item.Id
                                && s.SearchFilterId == ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_CITY)
                    .FirstOrDefaultAsync();

                var searchFilterPostSkill = await _dbContext.SearchFilter_Posts
                    .Where(s => s.PostId == item.Id
                                && s.SearchFilterId == ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_SKILL)
                    .FirstOrDefaultAsync();

                var jobSummary = new UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary.JobPostsSummaryDto
                {
                    UserId = item.UserId,
                    CompanyName = item.User.FullName,
                    Image = item.User.Image,
                    PostId = item.Id,
                    Title = item.Title,
                    CreateAt = item.CreatedAt,
                };

                if (searchFilterPostWorkType != null)
                {
                    jobSummary.WorkTypes = JsonConvert.DeserializeObject<List<string>>(searchFilterPostWorkType.Values);
                }
                if (searchFilterPostLocation != null)
                {
                    jobSummary.LocationNames = JsonConvert.DeserializeObject<List<string>>(searchFilterPostLocation.Values);
                }
                if (searchFilterPostSkill != null)
                {
                    jobSummary.Skills = JsonConvert.DeserializeObject<List<string>>(searchFilterPostSkill.Values);
                }

                result.Add(jobSummary);
            }

            return result;
        }

        public async Task<PagedResult<JobPostsSummaryDto>> GetActiveJobPostsSummaryBySearchFiltersForCandidateAsync(GetActiveJobPostsSummaryBySearchFiltersQuery request)
        {
            var now = DateTime.UtcNow;

            IQueryable<Models.Post> posts = _dbContext.Posts
                .Where(p => !p.IsDeleted &&
                            p.PostType == PostType.JobPosting &&
                            p.EndDate > now);

            // tìm theo SearchTerm
            if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            {
                var term = request.SearchTerm.Trim().ToLower();

                var skillPostIds = (await _dbContext.SearchFilter_Posts
                        .Where(sf => sf.SearchFilterId ==
                            ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_SKILL)
                        .ToListAsync())
                    .Where(sf => JsonConvert.DeserializeObject<List<string>>(sf.Values)
                        .Any(s => s.ToLower().Contains(term)))
                    .Select(sf => sf.PostId)
                    .ToList();

                posts = posts.Where(p =>
                    p.User.FullName.ToLower().Contains(term) ||
                    skillPostIds.Contains(p.Id) || p.Title.ToLower().Contains(term)); 
            }

            // lọc theo range
            foreach (var range in request.SearchFilterRanges)
            {
                if (!long.TryParse(range.Min, out var min) || !long.TryParse(range.Max, out var max))
                    continue;

                var postIdsInRange = (await _dbContext.SearchFilter_Posts
                        .Where(sf => sf.SearchFilterId == range.SearchFilterId)
                        .ToListAsync())
                    .Where(sf => ValueInRange(sf.Values, min, max))
                    .Select(sf => sf.PostId)
                    .ToList();

                posts = posts.Where(p => postIdsInRange.Contains(p.Id));
            }

            // lọc theo combobox
            foreach (var cbb in request.SearchFilterComboboxs.Where(c => !string.IsNullOrEmpty(c.Value)))
            {
                posts = posts.Where(p => _dbContext.SearchFilter_Posts.Any(sf =>
                    sf.PostId == p.Id &&
                    sf.SearchFilterId == cbb.SearchFilterId &&
                    sf.Values == cbb.Value));
            }

            // lọc theo checkbox
            foreach (var cb in request.SearchFilterCheckBoxs.Where(c => c.Values?.Any() == true))
            {
                var postIdsWithCheckbox = (await _dbContext.SearchFilter_Posts
                        .Where(sf => sf.SearchFilterId == cb.SearchFilterId)
                        .ToListAsync())
                    .Where(sf => JsonConvert.DeserializeObject<List<string>>(sf.Values)
                        .Any(v => cb.Values.Contains(v)))
                    .Select(sf => sf.PostId)
                    .ToList();

                posts = posts.Where(p => postIdsWithCheckbox.Contains(p.Id));
            }

            var totalRecords = await posts.CountAsync();
            var totalPages = (int)Math.Ceiling(totalRecords / (double)request.PageSize);

            var postIds = await posts
                .OrderByDescending(p => p.CreatedAt)
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(p => p.Id)
                .ToListAsync();

            var allSearchFilterData = await _dbContext.SearchFilter_Posts
                .Where(sf => postIds.Contains(sf.PostId) &&
                            (sf.SearchFilterId ==
                                 ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_SKILL ||
                             sf.SearchFilterId ==
                                 ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_WORK_TYPE ||
                             sf.SearchFilterId ==
                                 ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_CITY))
                .ToListAsync();

            var postDetails = await _dbContext.Posts
                .Include(p => p.User)
                .Where(p => postIds.Contains(p.Id))
                .ToListAsync();

            var result = new List<JobPostsSummaryDto>();

            foreach (var post in postDetails)
            {
                var jobSummary = new JobPostsSummaryDto
                {
                    UserId = post.UserId,
                    CompanyName = post.User.FullName,
                    Image = post.User.Image,
                    PostId = post.Id,
                    Title = post.Title,
                    CreateAt = post.CreatedAt
                };

                var workTypeFilter = allSearchFilterData.FirstOrDefault(sf =>
                    sf.PostId == post.Id &&
                    sf.SearchFilterId ==
                        ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_WORK_TYPE);

                if (workTypeFilter != null)
                    jobSummary.WorkTypes =
                        JsonConvert.DeserializeObject<List<string>>(workTypeFilter.Values) ?? new List<string>();

                var locationFilter = allSearchFilterData.FirstOrDefault(sf =>
                    sf.PostId == post.Id &&
                    sf.SearchFilterId ==
                        ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_CITY);

                if (locationFilter != null)
                    jobSummary.LocationNames =
                        JsonConvert.DeserializeObject<List<string>>(locationFilter.Values) ?? new List<string>();

                var skillFilter = allSearchFilterData.FirstOrDefault(sf =>
                    sf.PostId == post.Id &&
                    sf.SearchFilterId ==
                        ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_SKILL);

                if (skillFilter != null)
                    jobSummary.Skills =
                        JsonConvert.DeserializeObject<List<string>>(skillFilter.Values) ?? new List<string>();

                result.Add(jobSummary);
            }

            return new PagedResult<JobPostsSummaryDto>
            {
                Items = result,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                TotalPages = totalPages,
                TotalRecords = totalRecords
            };
        }

        private static bool ValueInRange(string value, long minWanted, long maxWanted)
        {
            var parts = value.Split('_');
            if (parts.Length != 2) return false;
            if (!long.TryParse(parts[0], out var min) ||
                !long.TryParse(parts[1], out var max)) return false;
            return minWanted <= max && maxWanted >= min;
        }


    }
}
