using ITJobs.Entities;
using ITJobs.Entities.Enums;
using ITJobs.Infrastructure.SqlServer.Models;
using ITJobs.UseCases.Admins.Users.Candidates.Queries.GetCandidateSummary;
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
    public class CandidateRepository : ICandidateRepository
    {
        private readonly ITJobsDbContext _dbContext;
        public CandidateRepository(ITJobsDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task AddAsync(Guid userId)
        {
            await _dbContext.Candidates.AddAsync(new Models.Candidate()
            {
                UserId = userId
            });
        }

        public async Task<List<CandidateSummaryDto>> GetCandidatesSummarAsync()
        {
            var candidates = new List<CandidateSummaryDto>();

            var fCandidates = await _dbContext.Candidates.ToListAsync();

            foreach (var fUser in fCandidates)
            {
                candidates.Add(new CandidateSummaryDto()
                {
                    UserId = fUser.UserId,
                    Image = fUser.User.Image,
                    FullName = fUser.User.FullName,
                    Email = fUser.User.Email,
                    IsLock = fUser.User.IsLocked,
                    SocialMedias = JsonConvert.DeserializeObject<List<Entities.SocialMedia>>(fUser.User.SocialMediaLinks)
                });
            }
            return candidates;
        }

        public async Task<bool> LockAccountAsync(Guid userId)
        {
            var fUser = await _dbContext.Users.FindAsync(userId);
            if (fUser == null || fUser.RoleType != RoleType.Candidate)
            {
                return false;
            }
            fUser.IsLocked = true;
            return true;
        }
    }
}
