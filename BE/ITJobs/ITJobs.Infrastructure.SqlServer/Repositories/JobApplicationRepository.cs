using ITJobs.UseCases.Candidates.JobApplications.Commands.AddJobApplication;
using ITJobs.UseCases.Candidates.JobApplications.Queries.GetJobApplicationHistories;
using ITJobs.UseCases.Employers.JobApplications.Queries.GetJobApplicationsByPostId;
using ITJobs.UseCases.Helpers.Paginations;
using ITJobs.UseCases.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Repositories
{
    public class JobApplicationRepository : IJobApplicationRepository
    {
        private readonly ITJobsDbContext _dbContext;

        public JobApplicationRepository(ITJobsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddJobApplicationAsync(AddJobApplicationCommand request, Guid idAdd)
        {
            var userId = request.UserId.Value;
            var candidate = await _dbContext.Candidates.FirstOrDefaultAsync(c => c.UserId == userId);
            if (candidate == null)
            {
                throw new Entities.Exceptions.UserNotFoundException();
            }

            var fJobAppli = await _dbContext.JobApplications.FirstOrDefaultAsync(ja => ja.CandidateId == candidate.Id);
            if (fJobAppli != null)
            {
                throw new Entities.Exceptions.JobAlreadyAppliedException();
            }

            var fJobPost = await _dbContext.Posts.FirstOrDefaultAsync(p => p.Id == request.PostId && !p.IsDeleted && p.PostType == Entities.Enums.PostType.JobPosting && p.EndDate > DateTime.Now);
            if (fJobPost == null)
            {
                throw new Entities.Exceptions.PostNotFoundException();
            }

            await _dbContext.JobApplications.AddAsync(new Models.JobApplication()
            {
                Id = idAdd,
                PostId = request.PostId,
                CandidateId = candidate.Id,
                CVLink = request.CVLink,
                CoverLetter = request.CoverLetter,
                StatusJobApplication = Entities.Enums.StatusJobApplication.Submitted
            });
        }

        public async Task<PagedResult<JobApplicationHistoryDto>> GetJobApplicationHistoriesAsync(GetJobApplicationHistoriesQuery request)
        {
            var fUser = await _dbContext.Users.FindAsync(request.UserId.Value);
            if (fUser == null)
            {
                throw new Entities.Exceptions.UserNotFoundException();
            }

            var query = _dbContext.JobApplications
                .Include(ja => ja.Post)
                .ThenInclude(p => p.User)
                .Include(ja => ja.Candidate)
                .Where(ja => ja.Candidate.UserId == request.UserId && !ja.Post.IsDeleted);

            if (!string.IsNullOrEmpty(request.SearchTerm))
            {
                string searchTerm = request.SearchTerm.Trim().ToLower();
                query = query.Where(ja => ja.Post.Title.ToLower().Contains(searchTerm) || ja.Post.User.FullName.ToLower().Contains(request.SearchTerm.ToLower()));
            }


            var totalRecords = await query.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalRecords / request.PageSize);

            var items = await query
                .OrderByDescending(ja => ja.CreatedAt)
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(ja => new JobApplicationHistoryDto
                {
                    JobApplicationId = ja.Id,
                    PostId = ja.PostId,
                    PostTitle = ja.Post.Title,
                    CVLink = ja.CVLink,
                    CoverLetter = ja.CoverLetter,
                    StatusJobApplication = ja.StatusJobApplication,
                    CreatedAt = ja.CreatedAt,
                    EmpoyerUserId = ja.Post.UserId,
                    CompanyName = ja.Post.User.FullName,
                    EmployerImage = ja.Post.User.Image
                })
                .ToListAsync();

            return new PagedResult<JobApplicationHistoryDto>
            {
                Items = items,
                TotalRecords = totalRecords,
                TotalPages = totalPages,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize
            };
        }

        public async Task<PagedResult<JobApplicationDto>> GetJobApplicationsByPostIdAsync(GetJobApplicationsByPostIdQuery request)
        {

            var query = _dbContext.JobApplications.Include(ja => ja.Candidate)
                                                  .Include(ja => ja.Candidate.User)
                                                  .Include(ja => ja.Post)
                                                  .Where(ja => ja.PostId == request.PostId && !ja.Post.IsDeleted);
            if (request.StatusJobApplication.HasValue)
            {
                query = query.Where(ja => ja.StatusJobApplication == request.StatusJobApplication.Value);
            }
            if (!string.IsNullOrEmpty(request.SearchTerm))
            {
                string searchTerm = request.SearchTerm.Trim().ToLower();
                query = query.Where(ja => ja.Candidate.User.FullName.ToLower().Contains(request.SearchTerm) || ja.Candidate.User.Email.ToLower().Contains(request.SearchTerm));
            }

            var totalRecords = await query.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalRecords / request.PageSize);

            var items = await query
                .OrderByDescending(ja => ja.CreatedAt)
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(ja => new JobApplicationDto
                {
                    Id = ja.Id,
                    PostId = ja.PostId,
                    CVLink = ja.CVLink,
                    CoverLetter = ja.CoverLetter,
                    StatusJobApplication = ja.StatusJobApplication,
                    CreatedAt = ja.CreatedAt,

                    UserId = ja.Candidate.UserId,
                    CandidateEmail = ja.Candidate.User.Email,
                    CandidateFullName = ja.Candidate.User.FullName,
                    CandidateImage = ja.Candidate.User.Image
                })
                .ToListAsync();
            return new PagedResult<JobApplicationDto>
            {
                Items = items,
                TotalRecords = totalRecords,
                TotalPages = totalPages,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize
            };
        }

        public async Task<List<(Guid PostId, int ApplicationCount)>> GetTopPostsByApplicationsCountAsync()
        {
            var result = await _dbContext.JobApplications
                .GroupBy(ja => ja.PostId)
                .Select(group => new
                {
                    PostId = group.Key,
                    Count = group.Count()
                })
                .OrderByDescending(g => g.Count)
                .ToListAsync();

            return result.Select(r => (r.PostId, r.Count)).ToList();
        }
    }
}
