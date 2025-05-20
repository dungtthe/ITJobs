using ITJobs.Entities;
using ITJobs.UseCases.Interfaces.Repositories;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Repositories
{
    public class SearchFilterRepository : ISearchFilterRepository
    {
        private readonly ITJobsDbContext _dbContext;
        public SearchFilterRepository(ITJobsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddSearchFilterCheckboxOrComboboxAsync(Entities.SearchFilter searchFilter)
        {
            string values = "";
            if (searchFilter.SearchFilterType== Entities.Enums.SearchFilterType.Checkbox)
            {
                values = JsonConvert.SerializeObject(((SearchFilterCheckBox)searchFilter).Values);
            }
            else
            {
                values = JsonConvert.SerializeObject(((SearchFilterCombobox)searchFilter).Values);
            }

            await _dbContext.SearchFilters.AddAsync(new Models.SearchFilter()
            {
                Id = searchFilter.Id,
                Name = searchFilter.Name,
                SearchFilterType = searchFilter.SearchFilterType,
                Values = values
            });
        }

        public async Task AddSearchFilterRangeAsync(Entities.SearchFilterRange searchFilterRange)
        {
            var valueMinMax = searchFilterRange.Min+ "_" + searchFilterRange.Max;
            await _dbContext.SearchFilters.AddAsync(new Models.SearchFilter()
            {
                Id = searchFilterRange.Id,
                Name = searchFilterRange.Name,
                SearchFilterType = searchFilterRange.SearchFilterType,
                Values= valueMinMax
            });
        }
    }
}
