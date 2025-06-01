using ITJobs.Entities;
using ITJobs.Entities.Enums;
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

        public async Task<Entities.AppUser> GetUserByEmailAsync(string email)
        {
            var rs = await _dbContext.Users.SingleOrDefaultAsync(u => u.Email == email);
            if (rs == null)
            {
                return null;
            }
            return new Entities.AppUser
            {
                Id = rs.Id,
                Password = rs.Password,
                FullName = rs.FullName,
                Email = rs.Email,
                PhoneNumber = rs.PhoneNumber,
                Address = rs.Address,
                Gender = rs.Gender,
                DateOfBirth = rs.DateOfBirth,
                Image = rs.Image,
                AccountBalance = rs.AccountBalance,
                RoleType = rs.RoleType,
                IsLocked = rs.IsLocked,
            };
        }

        public async Task<bool> IsEmailExistsAsync(string email)
        {
            email = email.ToLower().Trim();
            return await _dbContext.Users.AnyAsync(x => x.Email.ToLower() == email);

        }

        public async Task<bool> IsUserAdminExistsAsync(Guid userId)
        {
            return await _dbContext.Users.AnyAsync(user => user.Id == userId && user.RoleType == RoleType.Admin);
        }

       
        public async Task RegisterAsync(Guid id,  string passWord, string email, string fullName, RoleType roleType)
        {
            var userEntity = new Models.AppUser
            {
                Id = id,
                Password = passWord,
                Email = email,
                FullName = fullName,
                RoleType = roleType
            };
            await _dbContext.Users.AddAsync(userEntity);
        }

        public async Task UpdateImageAsync(Guid userId, string image)
        {
            var user = await _dbContext.Users.FindAsync(userId);
            if (user != null)
            {
                user.Image = image;
                _dbContext.Users.Update(user);
            }
        }

        public async Task<bool> UserExistsAsync(Guid userId)
        {
            return await _dbContext.Users.AnyAsync(user => user.Id == userId);
        }
    }
}

