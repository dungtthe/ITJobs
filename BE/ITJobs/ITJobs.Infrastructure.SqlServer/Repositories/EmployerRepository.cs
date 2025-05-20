using ITJobs.Entities.Enums;
using ITJobs.UseCases.Interfaces.Repositories;
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
