using ITJobs.Entities;
using ITJobs.UseCases.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
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

        public async Task<bool> IsEmailExistsAsync(string email)
        {
            email = email.ToLower().Trim();
            return await _dbContext.Users.AnyAsync(x => x.Email.ToLower() == email);

        }

        public async Task<bool> IsUserNameExistsAsync(string userName)
        {
            userName = userName.ToLower().Trim();
            return await _dbContext.Users.AnyAsync(x => x.UserName.ToLower() == userName);
        }

        public async Task RegisterAsync(Guid id,string userName, string passWord, string email, string fullName)
        {
            var userEntity = new Models.AppUser
            {
                Id =id,
                UserName = userName,
                Password = passWord,
                Email = email,
                FullName = fullName
            };
            await _dbContext.Users.AddAsync(userEntity);
        }
    }
}

