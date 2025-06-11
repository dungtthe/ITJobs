using ITJobs.UseCases.Candidates.Accounts.Commands.UploadCVs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.Repositories
{
    public interface ICVRepository
    {
        Task DeleteCVByIdAsync(Guid candidateId, Guid cVId);
        Task UploadCVsAsync(Guid userId, List<Entities.CV> cVs);
        Task<Entities.CV> GetCVByIdAsync(Guid id);
    }
}
