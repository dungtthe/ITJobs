using ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateProject;
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
    public class ProjectRepository: IProjectRepository
    {
        private readonly ITJobsDbContext _dbContext;

        public ProjectRepository(ITJobsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddAsync(Guid candidateId, AddOrUpdateProjectCommand request)
        {
            await _dbContext.Projects.AddAsync(new Models.Project()
            {
                Id = request.ProjectId.Value,
                CandidateId = candidateId,
                Name = request.Name,
                IsOnGoing = request.IsOnGoing,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Description = request.Description,
                SocialMediaLinks = JsonConvert.SerializeObject(request.SocialMediaLinks)
            });
        }

        public async Task DeleteProjectAsync(Guid projectId)
        {
            var project = await _dbContext.Projects.FirstOrDefaultAsync(p => p.Id == projectId);
            if (project != null)
            {
                _dbContext.Projects.Remove(project);
            }
            else
            {
                throw new Entities.Exceptions.ProjectNotFoundException();
            }
        }

        public async Task<bool> IsProjectOwnedByCandidateAsync(Guid projectId, Guid candidateId)
        {
            return await _dbContext.Projects.AnyAsync(p => p.Id == projectId && p.CandidateId == candidateId);
        }

        public async Task UpdateAsync(AddOrUpdateProjectCommand request)
        {
            var project = await _dbContext.Projects.FirstOrDefaultAsync(p => p.Id == request.ProjectId.Value);
            if (project != null)
            {
                project.Name = request.Name;
                project.IsOnGoing = request.IsOnGoing;
                project.StartDate = request.StartDate;
                project.EndDate = request.EndDate;
                project.Description = request.Description;
                project.SocialMediaLinks = JsonConvert.SerializeObject(request.SocialMediaLinks);
                _dbContext.Projects.Update(project);
            }
            else
            {
                throw new Entities.Exceptions.ProjectNotFoundException();
            }
        }
    }
}
