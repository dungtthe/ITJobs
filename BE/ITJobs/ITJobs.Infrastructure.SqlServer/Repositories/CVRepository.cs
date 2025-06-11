using ITJobs.Entities;
using ITJobs.UseCases.Candidates.Accounts.Commands.UploadCVs;
using ITJobs.UseCases.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Repositories
{
    public class CVRepository : ICVRepository
    {
        private readonly ITJobsDbContext _dbContext;
        public CVRepository(ITJobsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task DeleteCVByIdAsync(Guid candidateId, Guid cVId)
        {
            var fCV = await _dbContext.CVs.FirstOrDefaultAsync(c => c.Id == cVId && c.CandidateId == candidateId);
            if (fCV == null)
            {
                throw new Entities.Exceptions.CVNotFoundException();
            }
            _dbContext.CVs.Remove(fCV);
        }

        public async Task<CV> GetCVByIdAsync(Guid id)
        {
            var fCV = await _dbContext.CVs.FirstOrDefaultAsync(c => c.Id == id);
            if (fCV == null)
            {
                throw new Entities.Exceptions.CVNotFoundException();
            }
            return new CV()
            {
                Id = fCV.Id,
                CandidateId = fCV.CandidateId,
                FileName = fCV.FileName,
                OriginalFileName = fCV.OriginalFileName,
                CreatedAt = fCV.CreatedAt
            };
        }

        public async Task UploadCVsAsync(Guid userId, List<Entities.CV> cVs)
        {
            foreach (var item in cVs)
            {
                await _dbContext.CVs.AddAsync(new Models.CV()
                {
                    Id = item.Id,
                    CandidateId = item.CandidateId,
                    FileName = item.FileName,
                    OriginalFileName = item.OriginalFileName,
                });
            }
        }
    }
}
