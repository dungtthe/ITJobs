using ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateAward;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.Repositories
{
    public interface IAwardRepository
    {
        Task AddAsync(Guid candidateId, AddOrUpdateAwardCommand request);
        Task UpdateAsync(AddOrUpdateAwardCommand request);
        Task DeleteAwardAsync(Guid awardId);
        Task<bool> IsAwardOwnedByCandidateAsync(Guid awardId, Guid candidateId);
    }
}
