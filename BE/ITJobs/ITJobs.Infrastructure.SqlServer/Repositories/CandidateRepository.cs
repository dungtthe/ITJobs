using ITJobs.Entities;
using ITJobs.Entities.Enums;
using ITJobs.Infrastructure.SqlServer.Models;
using ITJobs.UseCases.Admins.Users.Candidates.Queries.GetCandidateSummary;
using ITJobs.UseCases.Helpers.Paginations;
using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Shared.Candidates.Queries.GetCandidateProfile;
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

        public async Task<Guid> GetCandidateIdByUserIdAsync(Guid userId)
        {
            var fCandidate = await _dbContext.Candidates.FirstOrDefaultAsync(c => c.UserId == userId);
            if (fCandidate == null)
            {
                throw new Entities.Exceptions.UserNotFoundException();
            }
            return fCandidate.Id;
        }

        public async Task<CandidateProfileDto> GetCandidateProfileAsync(Guid userId)
        {
            var fUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId && u.RoleType == Entities.Enums.RoleType.Candidate);
            var fCandidate = await _dbContext.Candidates.FirstOrDefaultAsync(c => c.UserId == userId);
            var cvs = await _dbContext.CVs.Where(c => c.CandidateId == fCandidate.Id).ToListAsync();
            return new CandidateProfileDto()
            {
                UserId= userId,
                FullName = fUser.FullName,
                Email = fUser.Email,
                PhoneNumber = fUser.PhoneNumber,
                Address = fUser.Address,
                Gender = fUser.Gender,
                DateOfBirth = fUser.DateOfBirth,
                Image = fUser.Image,
                SocialMediaLinks = JsonConvert.DeserializeObject<List<Entities.SocialMedia>>(fUser.SocialMediaLinks),

                AboutMe = fCandidate.AboutMe,
                CVs = cvs.Select(c => new Entities.CV()
                {
                    Id = c.Id,
                    CandidateId = c.CandidateId,
                    FileName = c.FileName,
                    OriginalFileName = c.OriginalFileName,
                    CreatedAt = c.CreatedAt
                }).ToList()
            };
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

        public async Task UpdateAboutmeAsync(Guid userId, string content)
        {
            var fCandidate = await _dbContext.Candidates.FirstOrDefaultAsync(c => c.UserId == userId);
            if (fCandidate == null)
            {
                return;
            }
            fCandidate.AboutMe = content;
        }

        public async Task UpdateOverviewAsync(Guid userId, string fullName, string phoneNumber, string address, string gender, DateTime ?dateOfBirth, List<SocialMedia> socialMediaLinks)
        {
            var fUser = await _dbContext.Users.FindAsync(userId);
            if (fUser == null || fUser.RoleType != RoleType.Candidate)
            {
                return;
            }
            fUser.FullName = fullName;
            fUser.PhoneNumber = phoneNumber;
            fUser.Address = address;
            fUser.Gender = gender;
            fUser.DateOfBirth = dateOfBirth;
            fUser.SocialMediaLinks = JsonConvert.SerializeObject(socialMediaLinks);
        }
    }
}
