using ITJobs.UseCases.Admins.Users.Candidates.Queries.GetCandidates.GetCandidateSummary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.Repositories
{
    public interface ICandidateRepository
    {
        Task AddAsync(Guid userId);
        Task<List<CandidateSummaryDto>> GetCandidatesSummarAsync();
        Task<bool> LockAccountAsync(Guid userId);
    }
}
