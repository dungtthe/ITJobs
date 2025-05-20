using ITJobs.Entities;
using ITJobs.UseCases.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Repositories
{
    public class CVTemplateRepository : ICVTemplateRepository
    {
        private readonly ITJobsDbContext _dbContext;
        public CVTemplateRepository(ITJobsDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task AddAsync(Entities.CVTemplate cVTemplate)
        {
            await _dbContext.AddAsync(new Models.CVTemplate()
            {
                Id= cVTemplate.Id,
                UserId = cVTemplate.UserId,
                Content = cVTemplate.Content,
                SortOrder= cVTemplate.SortOrder
            });
        }

        public async Task<List<Entities.CVTemplate>> GetAllAsync()
        {
            var dbTemplates = await _dbContext.CVTemplates.ToListAsync();

            var result = dbTemplates.Select(x => new Entities.CVTemplate
            {
                Id = x.Id,
                UserId = x.UserId,
                Content = x.Content,
                SortOrder = x.SortOrder,
                AuthorName = x.User.FullName,
                AuthorImage = x.User.Image
            }).ToList();
            return result;
        }
    }
}
