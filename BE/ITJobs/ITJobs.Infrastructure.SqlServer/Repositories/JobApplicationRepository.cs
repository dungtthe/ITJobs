using ITJobs.UseCases.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Repositories
{
    public class JobApplicationRepository: IJobApplicationRepository
    {
        private readonly ITJobsDbContext _dbContext;

        public JobApplicationRepository(ITJobsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<(Guid PostId, int ApplicationCount)>> GetTopPostsByApplicationsCountAsync()
        {
            var result = await _dbContext.JobApplications
                .GroupBy(ja => ja.PostId)
                .Select(group => new
                {
                    PostId = group.Key,
                    Count = group.Count()
                })
                .OrderByDescending(g => g.Count)
                .ToListAsync();

            return result.Select(r => (r.PostId, r.Count)).ToList();
        }
    }
}
