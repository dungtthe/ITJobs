using ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateEducation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.Repositories
{
    public interface IEducationRepository
    {
        Task AddAsync(Guid candidateId, AddOrUpdateEducationCommand request);
        Task DeleteEducationAsync(Guid educationId);
        Task <bool> IsEducationOwnedByCandidateAsync(Guid educationId, Guid candidateId);
        Task UpdateAsync(AddOrUpdateEducationCommand request);
    }
}
