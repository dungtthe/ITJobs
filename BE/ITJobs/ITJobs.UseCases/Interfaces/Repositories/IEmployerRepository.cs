using ITJobs.Entities;
using ITJobs.UseCases.Admins.Users.Employers.Queries.GetEmployersSummary;
using ITJobs.UseCases.Candidates.Employers.Queries.GetTopEmployersByApplicationsSummary;
using ITJobs.UseCases.Employers.CompanyProfiles.Commands.UpdateGeneralInfos;
using ITJobs.UseCases.Helpers.Paginations;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.Repositories
{
    public interface IEmployerRepository
    {

        Task<bool> EmployerExistsAsync(Guid userId);

        #region admin
        Task AddAsync(Guid userId, string companyname);
        Task<bool> LockAccountAsync(Guid userId);
        Task<PagedResult<UseCases.Admins.Users.Employers.Queries.GetEmployersSummary.EmployerSummaryDto>> GetEmployersSummarAsync(BasePaginationParameters parameters);
        Task<UseCases.Admins.Users.Employers.Queries.GetEmployerByUserId.EmployerDto> GetEmployerByUserIdForAdminAsync(Guid userId);
        #endregion

        #region employer
        Task<UseCases.Employers.CompanyProfiles.Queries.GetCompanyProfile.CompanyProfileDto> GetCompanyProfileAsync(Guid userId);
        Task UpdateGeneralInfosAsync(Guid userId, List<Entities.GeneralInfoItem> generalInfos);
        Task UpdateCompanyIntroductionAsync(Guid userId, string companyIntroduction);
        Task UpdateSkillAsync(Guid userId, List<string> skills);
        Task UpdateLocationsAsync(Guid userId, List<Location> locations);
        Task UpdateOverView(Guid userId, string phoneNumber, string companyName, string websiteUrl, string companyType);
        #endregion

        Task<List<Guid>> GetEmployerIdsExcludingAsync(List<Guid> excludedIds, int count);
        Task<Candidates.Employers.Queries.GetTopEmployersByApplicationsSummary.EmployerSummaryDto> GetEmployerSummaryByIdAsync(Guid employerId);
    }
}
