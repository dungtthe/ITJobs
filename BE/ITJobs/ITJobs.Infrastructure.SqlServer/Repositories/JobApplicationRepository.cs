using ITJobs.UseCases.Candidates.JobApplications.Commands.AddJobApplication;
using ITJobs.UseCases.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Repositories
{
    public class JobApplicationRepository: IJobApplicationRepository
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

            var fJobPost = await _dbContext.Posts.FirstOrDefaultAsync(p=>p.Id==request.PostId && !p.IsDeleted && p.PostType == Entities.Enums.PostType.JobPosting && p.EndDate>DateTime.Now);
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
