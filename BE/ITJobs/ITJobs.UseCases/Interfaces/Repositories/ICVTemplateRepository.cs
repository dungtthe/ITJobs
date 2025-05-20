using ITJobs.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.Repositories
{
    public interface ICVTemplateRepository
    {
        Task AddAsync(CVTemplate cVTemplate);
        Task<List<CVTemplate>> GetAllAsync();
    }
}
