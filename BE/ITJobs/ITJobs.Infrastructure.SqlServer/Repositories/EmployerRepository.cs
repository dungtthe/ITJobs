using ITJobs.Entities;
using ITJobs.Entities.Enums;
using ITJobs.UseCases.Admins.Users.Employers.Queries.GetEmployerByUserId;
using ITJobs.UseCases.Admins.Users.Employers.Queries.GetEmployersSummary;
using ITJobs.UseCases.Employers.CompanyProfiles.Queries.GetCompanyProfile;
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
    public class EmployerRepository : IEmployerRepository
    {
        private readonly ITJobsDbContext _dbContext;
        public EmployerRepository(ITJobsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddAsync(Guid userId, string companyname)
        {
            await _dbContext.Employers.AddAsync(new Models.Employer()
            {
                UserId = userId,
                CompanyName = companyname
            });
        }

        public async Task<PagedResult<EmployerSummaryDto>> GetEmployersSummarAsync(BasePaginationParameters parameters)
        {
            var query = _dbContext.Employers.AsQueryable();

            if (!string.IsNullOrEmpty(parameters.SearchTerm))
            {
                var searchTerm = parameters.SearchTerm.ToLower();
                query = query.Where(e =>
                    e.CompanyName.ToLower().Contains(searchTerm) ||
                    e.User.Email.ToLower().Contains(searchTerm)
                );
            }

            var totalCount = await query.CountAsync();

            var employers = await query
                .Include(e => e.User)
                .Skip((parameters.PageNumber - 1) * parameters.PageSize)
                .Take(parameters.PageSize)
                .Select(fEmployer => new EmployerSummaryDto()
                {
                    UserId = fEmployer.UserId,
                    CompanyName = fEmployer.CompanyName,
                    Image = fEmployer.User.Image,
                    AccountBalance = fEmployer.User.AccountBalance + "",
                    Email = fEmployer.User.Email,
                    IsLock = fEmployer.User.IsLocked
                })
                .ToListAsync();

            var result = new PagedResult<EmployerSummaryDto>
            {
                PageNumber = parameters.PageNumber,
                PageSize = parameters.PageSize,
                TotalRecords = totalCount,
                TotalPages = (int)Math.Ceiling(totalCount / (double)parameters.PageSize),
                Items = employers
            };

            return result;
        }



        public async Task<bool> LockAccountAsync(Guid userId)
        {
            var fUser = await _dbContext.Users.FindAsync(userId);
            if (fUser == null || fUser.RoleType!=RoleType.Employer)
            {
                return false;
            }
            fUser.IsLocked = true;
            return true;
        }

        public async Task<UseCases.Admins.Users.Employers.Queries.GetEmployerByUserId.EmployerDto> GetEmployerByUserIdForAdminAsync(Guid userId)
        {

            //tim employer theo userId
            var employer = await _dbContext.Employers
                .Include(e => e.User)
                .FirstOrDefaultAsync(e => e.UserId == userId);

            if (employer == null)
            {
                return null;
            }

            var employerDto = new UseCases.Admins.Users.Employers.Queries.GetEmployerByUserId.EmployerDto
            {
                UserId = employer.UserId,
                Image = employer.User.Image,
                Email = employer.User.Email,
                AccountBalance = employer.User.AccountBalance.ToString(),
                IsLocked = employer.User.IsLocked,
                PhoneNumber = employer.User.PhoneNumber,
                SocialMediaLinks = JsonConvert.DeserializeObject<List<Entities.SocialMedia>>(employer.User.SocialMediaLinks),
                Skills = JsonConvert.DeserializeObject<List<string>>(employer.Skills),
                CompanyName = employer.CompanyName,
                GeneralInfo = JsonConvert.DeserializeObject<List<Entities.GeneralInfoItem>>(employer.GeneralInfo),
                CompanyIntroduction = employer.CompanyIntroduction,
                AdditionalInfo = employer.AdditionalInfo,
                Locations = JsonConvert.DeserializeObject<List<Entities.Location>>(employer.Locations),
                WebsiteUrl = employer.WebsiteUrl,
                CompanyType = employer.CompanyType,
                PostedBlogCount = await _dbContext.Posts.CountAsync(p => p.UserId == userId && p.PostType == PostType.News),
                PostedJobCount = await _dbContext.Posts.CountAsync(p => p.UserId == userId && p.PostType == PostType.JobPosting),
            };
         

            return employerDto;
        }

        public async Task<CompanyProfileDto> GetCompanyProfileAsync(Guid userId)
        {
            var fEmployer = await _dbContext.Employers
                .Include(e => e.User)
                .FirstOrDefaultAsync(e => e.UserId == userId);

            if (fEmployer == null)
            {
                return null;
            }


            //user
            var companyProfileDto = new CompanyProfileDto
            {
                UserId = fEmployer.UserId,
                Email = fEmployer.User.Email,
                PhoneNumber = fEmployer.User.PhoneNumber,
                Image = fEmployer.User.Image,
                AccountBalance = fEmployer.User.AccountBalance.ToString(),
                SocialMediaLinks = JsonConvert.DeserializeObject<List<Entities.SocialMedia>>(fEmployer.User.SocialMediaLinks),

                //employer
                CompanyName = fEmployer.CompanyName,
                GeneralInfo = JsonConvert.DeserializeObject<List<Entities.GeneralInfoItem>>(fEmployer.GeneralInfo),
                CompanyIntroduction = fEmployer.CompanyIntroduction,
                Skills = JsonConvert.DeserializeObject<List<string>>(fEmployer.Skills),
                AdditionalInfo = fEmployer.AdditionalInfo,
                Locations = JsonConvert.DeserializeObject<List<Entities.Location>>(fEmployer.Locations),
                WebsiteUrl = fEmployer.WebsiteUrl,
                CompanyType = fEmployer.CompanyType
            };
            return companyProfileDto;
        }
    }
}
