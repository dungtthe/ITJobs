using ITJobs.UseCases.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Repositories
{
    public class SearchFilter_PostRepository : ISearchFilter_PostRepository
    {
        private readonly ITJobsDbContext _dbContext;
        public SearchFilter_PostRepository(ITJobsDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task AddSearchFilter_Post(Guid searchFilterId, Guid postId, string values)
        {
            await _dbContext.AddAsync(new Models.SearchFilter_Post()
            {
                SearchFilterId = searchFilterId,
                PostId = postId,
                Values = values
            });
        }
    }
}
