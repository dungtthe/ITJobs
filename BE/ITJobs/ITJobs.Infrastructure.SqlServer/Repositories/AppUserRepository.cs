using ITJobs.Entities;
using ITJobs.UseCases.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Repositories
{
    public class AppUserRepository : IAppUserRepository
    {
        private readonly ITJobsDbContext _dbContext;
        public AppUserRepository(ITJobsDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Entities.AppUser> RegisterAsync(string userName, string passWord, string email, string fullName)
        {
            var userEntity = new Models.AppUser
            {
                UserName = userName,
                Password = passWord,
                Email = email,
                FullName = fullName
            };

            await _dbContext.Users.AddAsync(userEntity);
            return new Entities.AppUser()
            {
                Id = userEntity.Id,
                UserName = userEntity.UserName,
                Password = userEntity.Password,
                Email = userEntity.Email,
                FullName = userEntity.FullName
            };
        }
    }
}

