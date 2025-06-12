using ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateAward;
using ITJobs.UseCases.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Repositories
{
    public class AwardRepository: IAwardRepository
    {
        private readonly ITJobsDbContext _dbContext;

        public AwardRepository(ITJobsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddAsync(Guid candidateId, AddOrUpdateAwardCommand request)
        {
            await _dbContext.Awards.AddAsync(new Models.Award()
            {
                Id = request.AwardId.Value,
                CandidateId = candidateId,
                Name = request.Name,
                Organization = request.Organization,
                ReceivedDate = request.ReceivedDate,
                Description = request.Description,
                WebsiteUrl = request.WebsiteUrl
            });
        }

        public async Task DeleteAwardAsync(Guid awardId)
        {
            var award = await _dbContext.Awards.FirstOrDefaultAsync(a => a.Id == awardId);
            if (award != null)
            {
                _dbContext.Awards.Remove(award);
            }
            else
            {
                throw new Entities.Exceptions.AwardNotFoundException();
            }
        }

        public async Task<bool> IsAwardOwnedByCandidateAsync(Guid awardId, Guid candidateId)
        {
            return await _dbContext.Awards.AnyAsync(a => a.Id == awardId && a.CandidateId == candidateId);
        }

        public async Task UpdateAsync(AddOrUpdateAwardCommand request)
        {
            var award = await _dbContext.Awards.FirstOrDefaultAsync(a => a.Id == request.AwardId.Value);
            if (award != null)
            {
                award.Name = request.Name;
                award.Organization = request.Organization;
                award.ReceivedDate = request.ReceivedDate;
                award.Description = request.Description;
                award.WebsiteUrl = request.WebsiteUrl;
                _dbContext.Awards.Update(award);
            }
            else
            {
                throw new Entities.Exceptions.AwardNotFoundException();
            }
        }
    }
}
