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
        Task RegisterAsync(Guid id,string userName,string passWord,string email,string fullName, RoleType roleType);
        Task <bool> IsUserNameExistsAsync(string userName);
        Task <bool> IsEmailExistsAsync(string email);
        Task<Entities.AppUser> GetUserByUserNameAsync(string userName);
        Task<bool> IsUserAdminExistsAsync(Guid userId);
    }
}
