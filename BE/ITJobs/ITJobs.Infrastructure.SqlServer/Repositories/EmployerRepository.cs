using ITJobs.Entities;
using ITJobs.Entities.Enums;
using ITJobs.UseCases.Admins.Users.Employers.Queries.GetEmployers.GetEmployersSummary;
using ITJobs.UseCases.Helpers.Paginations;
using ITJobs.UseCases.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Repositories
{
    public class EmployerRepository : IEmployerRepository
    {
        private readonly ITJobsDbContext _dbContext;
        public EmployerRepository(ITJobsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddAsync(Guid userId, string companyname)
        {
            await _dbContext.Employers.AddAsync(new Models.Employer()
            {
                UserId = userId,
                CompanyName = companyname
            });
        }

        public async Task<PagedResult<EmployerSummaryDto>> GetEmployersSummarAsync(BasePaginationParameters parameters)
        {
            var query = _dbContext.Employers.AsQueryable();

            if (!string.IsNullOrEmpty(parameters.SearchTerm))
            {
                var searchTerm = parameters.SearchTerm.ToLower();
                query = query.Where(e =>
                    e.CompanyName.ToLower().Contains(searchTerm) ||
                    e.User.Email.ToLower().Contains(searchTerm)
                );
            }

            var totalCount = await query.CountAsync();

            var employers = await query
                .Include(e => e.User)
                .Skip((parameters.PageNumber - 1) * parameters.PageSize)
                .Take(parameters.PageSize)
                .Select(fEmployer => new EmployerSummaryDto()
                {
                    UserId = fEmployer.UserId,
                    CompanyName = fEmployer.CompanyName,
                    Image = fEmployer.User.Image,
                    AccountBalance = fEmployer.User.AccountBalance + "",
                    Email = fEmployer.User.Email,
                    IsLock = fEmployer.User.IsLocked
                })
                .ToListAsync();

            var result = new PagedResult<EmployerSummaryDto>
            {
                PageNumber = parameters.PageNumber,
                PageSize = parameters.PageSize,
                TotalRecords = totalCount,
                TotalPages = (int)Math.Ceiling(totalCount / (double)parameters.PageSize),
                Items = employers
            };

            return result;
        }



        public async Task<bool> LockAccountAsync(Guid userId)
        {
            var fUser = await _dbContext.Users.FindAsync(userId);
            if (fUser == null || fUser.RoleType!=RoleType.Employer)
            {
                return false;
            }
            fUser.IsLocked = true;
            return true;
        }
    }
}
