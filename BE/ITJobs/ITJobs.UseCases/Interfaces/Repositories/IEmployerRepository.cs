using ITJobs.Entities;
using ITJobs.UseCases.Admins.Users.Employers.Queries.GetEmployersSummary;
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

        #region admin
        Task AddAsync(Guid userId, string companyname);
        Task<bool> LockAccountAsync(Guid userId);
        Task<PagedResult<EmployerSummaryDto>> GetEmployersSummarAsync(BasePaginationParameters parameters);
        Task<UseCases.Admins.Users.Employers.Queries.GetEmployerByUserId.EmployerDto> GetEmployerByUserIdForAdminAsync(Guid userId);
        #endregion

        #region employer
        Task<UseCases.Employers.CompanyProfiles.Queries.GetCompanyProfile.CompanyProfileDto> GetCompanyProfileAsync(Guid userId);
        #endregion
    }
}
