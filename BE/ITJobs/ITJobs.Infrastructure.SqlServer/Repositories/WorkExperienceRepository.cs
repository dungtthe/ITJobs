using ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateWorkExperience;
using ITJobs.UseCases.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Repositories
{
    public class WorkExperienceRepository: IWorkExperienceRepository
    {
        private readonly ITJobsDbContext _dbContext;
        public WorkExperienceRepository(ITJobsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddAsync(Guid candidateId, AddOrUpdateWorkExperienceCommand request)
        {
            await _dbContext.WorkExperiences.AddAsync(new Models.WorkExperience()
            {
                Id = request.WorkExperienceId.Value,
                CandidateId = candidateId,
                JobTitle = request.JobTitle,
                CompanyName = request.CompanyName,
                WebsiteUrl = request.WebsiteUrl,
                IsCurrent = request.IsCurrent,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Description = request.Description
            });
        }

        public async Task DeleteWorkExperienceAsync(Guid workExperienceId)
        {
            var workExperience = await _dbContext.WorkExperiences.FirstOrDefaultAsync(e => e.Id == workExperienceId);
            if (workExperience != null)
            {
                _dbContext.WorkExperiences.Remove(workExperience);
            }
            else
            {
                throw new Entities.Exceptions.WorkExperienceNotFoundException();
            }
        }

        public async Task<bool> IsWorkExperienceOwnedByCandidateAsync(Guid workExperienceId, Guid candidateId)
        {
            return await _dbContext.WorkExperiences.AnyAsync(e => e.Id == workExperienceId && e.CandidateId == candidateId);
        }

        public async Task UpdateAsync(AddOrUpdateWorkExperienceCommand request)
        {
            var workExperience = await _dbContext.WorkExperiences.FirstOrDefaultAsync(e => e.Id == request.WorkExperienceId.Value);
            if (workExperience != null)
            {
                workExperience.JobTitle = request.JobTitle;
                workExperience.CompanyName = request.CompanyName;
                workExperience.WebsiteUrl = request.WebsiteUrl;
                workExperience.IsCurrent = request.IsCurrent;
                workExperience.StartDate = request.StartDate;
                workExperience.EndDate = request.EndDate;
                workExperience.Description = request.Description;
                _dbContext.WorkExperiences.Update(workExperience);
            }
            else
            {
                throw new Entities.Exceptions.WorkExperienceNotFoundException();
            }
        }
    }
}
