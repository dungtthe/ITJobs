using ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateCertification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.Repositories
{
    public interface ICertificationRepository
    {
        Task AddAsync(Guid candidateId, AddOrUpdateCertificationCommand request);
        Task UpdateAsync(AddOrUpdateCertificationCommand request);
        Task DeleteCertificationAsync(Guid certificationId);
        Task<bool> IsCertificationOwnedByCandidateAsync(Guid certificationId, Guid candidateId);
    }
}
