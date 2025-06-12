using ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateWorkExperience;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.Repositories
{
    public interface IWorkExperienceRepository
    {
        Task AddAsync(Guid candidateId, AddOrUpdateWorkExperienceCommand request);
        Task DeleteWorkExperienceAsync(Guid workExperienceId);
        Task<bool> IsWorkExperienceOwnedByCandidateAsync(Guid workExperienceId, Guid candidateId);
        Task UpdateAsync(AddOrUpdateWorkExperienceCommand request);
    }
}
