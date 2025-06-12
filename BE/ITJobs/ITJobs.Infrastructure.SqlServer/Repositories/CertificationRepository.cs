using ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateCertification;
using ITJobs.UseCases.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Repositories
{
    public class CertificationRepository: ICertificationRepository
    {
        private readonly ITJobsDbContext _dbContext;

        public CertificationRepository(ITJobsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddAsync(Guid candidateId, AddOrUpdateCertificationCommand request)
        {
            await _dbContext.Certifications.AddAsync(new Models.Certification()
            {
                Id = request.CertificationId.Value,
                CandidateId = candidateId,
                Name = request.Name,
                ReceivedDate = request.ReceivedDate,
                Images = request.Images != null ? JsonConvert.SerializeObject(request.Images) : null,
                WebsiteUrl = request.WebsiteUrl,
                Description = request.Description
            });
        }

        public async Task DeleteCertificationAsync(Guid certificationId)
        {
            var certification = await _dbContext.Certifications.FirstOrDefaultAsync(c => c.Id == certificationId);
            if (certification != null)
            {
                _dbContext.Certifications.Remove(certification);
            }
            else
            {
                throw new Entities.Exceptions.CertificationNotFoundException();
            }
        }

        public async Task<bool> IsCertificationOwnedByCandidateAsync(Guid certificationId, Guid candidateId)
        {
            return await _dbContext.Certifications.AnyAsync(c => c.Id == certificationId && c.CandidateId == candidateId);
        }

        public async Task UpdateAsync(AddOrUpdateCertificationCommand request)
        {
            var certification = await _dbContext.Certifications.FirstOrDefaultAsync(c => c.Id == request.CertificationId.Value);
            if (certification != null)
            {
                certification.Name = request.Name;
                certification.ReceivedDate = request.ReceivedDate;
                certification.Images = request.Images != null ? JsonConvert.SerializeObject(request.Images) : null;
                certification.WebsiteUrl = request.WebsiteUrl;
                certification.Description = request.Description;
                _dbContext.Certifications.Update(certification);
            }
            else
            {
                throw new Entities.Exceptions.CertificationNotFoundException();
            }
        }
    }
}
