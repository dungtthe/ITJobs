using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.Repositories
{
    public interface ICandidateRepository
    {
        Task AddAsync(Entities.AppUser appUser);
    }
}
