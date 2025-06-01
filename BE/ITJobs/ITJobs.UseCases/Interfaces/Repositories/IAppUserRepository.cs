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
        Task<bool> IsUserAdminExistsAsync(Guid userId);
        Task UpdateImageAsync(Guid userId, string image);
        Task<bool> UserExistsAsync(Guid userId);
    }
}
