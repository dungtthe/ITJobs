using ITJobs.Entities;
using ITJobs.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.Repositories
{
    public interface IAppUserRepository
    {
        Task RegisterAsync(Guid id,string passWord,string email,string fullName, RoleType roleType);
        Task <bool> IsEmailExistsAsync(string email);
        Task<Entities.AppUser> GetUserByEmailAsync(string email);
        Task<Entities.AppUser> GetUserByIdAsync(Guid userId);
        Task<bool> IsUserAdminExistsAsync(Guid userId);
        Task UpdateImageAsync(Guid userId, string image);
        Task<bool> UserExistsAsync(Guid userId);
        Task<bool> UserExistByPhoneNumberAsync(string phoneNumber, Guid userId);
        Task UpdateAccountBalanceAsync(Guid userId, long accountBalanceNew);
    }
}
