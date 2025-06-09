using ITJobs.UseCases.Admins.Users.Candidates.Queries.GetCandidateSummary;
using ITJobs.UseCases.Helpers.Paginations;
using Microsoft.AspNetCore.Mvc.RazorPages;
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
        Task<PagedResult<ITJobs.UseCases.Admins.Users.Candidates.Queries.GetCandidateSummary.CandidateSummaryDto>> GetCandidatesSummaryForAdminAsync(ITJobs.UseCases.Admins.Users.Candidates.Queries.GetCandidateSummary.GetCandidateSummaryQuery request);
        Task<bool> LockAccountAsync(Guid userId);
    }
}
