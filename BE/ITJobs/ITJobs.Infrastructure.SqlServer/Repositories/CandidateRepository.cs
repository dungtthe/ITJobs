using ITJobs.Entities;
using ITJobs.Entities.Enums;
using ITJobs.Infrastructure.SqlServer.Models;
using ITJobs.UseCases.Admins.Users.Candidates.Queries.GetCandidateSummary;
using ITJobs.UseCases.Helpers.Paginations;
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

        public async Task<List<CandidateSummaryDto>> GetCandidatesSummaryForAdminAsync()
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
                    SocialMedias = JsonConvert.DeserializeObject<List<Entities.SocialMedia>>(fUser.User.SocialMediaLinks),
                    PhoneNumber = fUser.User.PhoneNumber,
                });
            }
            return candidates;
        }

        public async Task<PagedResult<ITJobs.UseCases.Admins.Users.Candidates.Queries.GetCandidateSummary.CandidateSummaryDto>> GetCandidatesSummaryForAdminAsync(ITJobs.UseCases.Admins.Users.Candidates.Queries.GetCandidateSummary.GetCandidateSummaryQuery request)
        {
            var query = _dbContext.Users.Where(u=>u.RoleType == Entities.Enums.RoleType.Candidate).AsQueryable();
            if(!string.IsNullOrEmpty(request.SearchTerm))
            {
                var searchTerm = request.SearchTerm.ToLower();
                query = query.Where(c => c.FullName.ToLower().Contains(searchTerm)
                                    || c.Email.ToLower().Contains(searchTerm)
                                    || c.PhoneNumber.ToLower().Contains(searchTerm));
            }

            var totalCount = await query.CountAsync();
            var items = await query
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(u => new ITJobs.UseCases.Admins.Users.Candidates.Queries.GetCandidateSummary.CandidateSummaryDto
                {
                    UserId = u.Id,
                    Image = u.Image,
                    FullName = u.FullName,
                    Email = u.Email,
                    PhoneNumber = u.PhoneNumber,
                    IsLock = u.IsLocked,
                    SocialMedias = JsonConvert.DeserializeObject<List<Entities.SocialMedia>>(u.SocialMediaLinks),
                })
                .ToListAsync();

            var result = new PagedResult<ITJobs.UseCases.Admins.Users.Candidates.Queries.GetCandidateSummary.CandidateSummaryDto>
            {
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                TotalRecords = totalCount,
                TotalPages = (int)Math.Ceiling(totalCount / (double)request.PageSize),
                Items = items,
            };

            return result;
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
