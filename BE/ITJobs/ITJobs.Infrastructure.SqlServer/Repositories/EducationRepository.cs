using ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateEducation;
using ITJobs.UseCases.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Repositories
{
    public class EducationRepository : IEducationRepository
    {
        private readonly ITJobsDbContext _dbContext;
        public EducationRepository(ITJobsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddAsync(Guid candidateId, AddOrUpdateEducationCommand request)
        {
            await _dbContext.Educations.AddAsync(new Models.Education()
            {
                Id = request.EducationId.Value,
                CandidateId = candidateId,
                Name = request.Name,
                WebsiteUrl = request.WebsiteUrl,
                Degree = request.Degree,
                FieldOfStudy = request.FieldOfStudy,
                StartDate = request.StartDate,
                IsCompleted = request.IsCompleted,
                GPA = request.GPA
            });
        }

        public async Task DeleteEducationAsync(Guid educationId)
        {
            var education = await _dbContext.Educations.FirstOrDefaultAsync(e => e.Id == educationId);
            if (education != null)
            {
                _dbContext.Educations.Remove(education);
            }
            else
            {
                throw new Entities.Exceptions.EducationNotFoundException();
            }
        }

        public async Task<bool> IsEducationOwnedByCandidateAsync(Guid educationId, Guid candidateId)
        {
            return await _dbContext.Educations.AnyAsync(e => e.Id == educationId && e.CandidateId == candidateId);
        }

        public async Task UpdateAsync(AddOrUpdateEducationCommand request)
        {
            var education = await _dbContext.Educations.FirstOrDefaultAsync(e => e.Id == request.EducationId.Value);
            if (education != null)
            {
                education.Name = request.Name;
                education.WebsiteUrl = request.WebsiteUrl;
                education.Degree = request.Degree;
                education.FieldOfStudy = request.FieldOfStudy;
                education.StartDate = request.StartDate;
                education.IsCompleted = request.IsCompleted;
                education.GPA = request.GPA;
                _dbContext.Educations.Update(education);
            }
            else
            {
                throw new Entities.Exceptions.EducationNotFoundException();
            }
        }
    }
}
