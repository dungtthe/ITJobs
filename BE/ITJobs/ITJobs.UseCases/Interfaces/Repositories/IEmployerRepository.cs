using ITJobs.Entities;
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
    }
}
