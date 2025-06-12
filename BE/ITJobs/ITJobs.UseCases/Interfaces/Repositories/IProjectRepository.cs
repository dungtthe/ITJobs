using ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateProject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.Repositories
{
    public interface IProjectRepository
    {
        Task AddAsync(Guid candidateId, AddOrUpdateProjectCommand request);
        Task UpdateAsync(AddOrUpdateProjectCommand request);
        Task DeleteProjectAsync(Guid projectId);
        Task<bool> IsProjectOwnedByCandidateAsync(Guid projectId, Guid candidateId);
    }
}
