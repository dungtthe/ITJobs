using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.Repositories
{
    public interface IAppUserRepository
    {
        Task <Entities.AppUser> RegisterAsync(string userName,string passWord,string email,string fullName);
    }
}
