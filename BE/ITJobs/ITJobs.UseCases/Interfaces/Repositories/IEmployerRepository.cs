using ITJobs.Entities;
using ITJobs.UseCases.Admins.Users.Employers.Queries.GetEmployers.GetEmployersSummary;
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
        Task AddAsync(Guid userId, string companyname);
        Task<bool> LockAccountAsync(Guid userId);
        Task<List<EmployerSummaryDto>> GetEmployersSummarAsync();
    }
}
