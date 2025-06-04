using ITJobs.UseCases.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Repositories
{
    public class SystemValuesRepository : ISystemValuesRepository
    {
        private readonly ITJobsDbContext _dbContext;
        public SystemValuesRepository(ITJobsDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task<int> GetJobPostPriceFeeDayAsync()
        {
            var rs = await _dbContext.SystemValues.FirstOrDefaultAsync(x => x.Id == ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SYSTEMVALUE_JOB_POSTING_FEE_PER_DAY);
            return int.Parse(rs.Values);
        }
    }
}
