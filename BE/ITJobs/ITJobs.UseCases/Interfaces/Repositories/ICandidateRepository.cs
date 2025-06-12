using ITJobs.Entities;
using ITJobs.UseCases.Admins.Users.Candidates.Queries.GetCandidateSummary;
using ITJobs.UseCases.Helpers.Paginations;
using ITJobs.UseCases.Shared.Candidates.Queries.GetCandidateProfile;
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
        Task<Guid> GetCandidateIdByUserIdAsync(Guid userId);
        Task<CandidateProfileDto> GetCandidateProfileAsync(Guid userId);
        Task<PagedResult<ITJobs.UseCases.Admins.Users.Candidates.Queries.GetCandidateSummary.CandidateSummaryDto>> GetCandidatesSummaryForAdminAsync(ITJobs.UseCases.Admins.Users.Candidates.Queries.GetCandidateSummary.GetCandidateSummaryQuery request);
        Task<bool> LockAccountAsync(Guid userId);
        Task UpdateAboutmeAsync(Guid userId, string content);
        Task UpdateOverviewAsync(Guid userId, string fullName, string phoneNumber, string address, string gender, DateTime ?dateOfBirth, List<SocialMedia> socialMediaLinks);
        Task UpdateSkillAsync(Guid userId, List<string> skills);
    }
}
