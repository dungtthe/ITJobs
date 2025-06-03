using ITJobs.Entities;
using ITJobs.UseCases.Helpers.Paginations;
using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Shared.SearchFilters.Queries.GetSkills;
using ITJobs.UseCases.Shared.SearchFilters.Queries.GetSuggestedSkills;
using Microsoft.EntityFrameworkCore;
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
            if (searchFilter.SearchFilterType == Entities.Enums.SearchFilterType.Checkbox)
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
                Values = values,
                ViewOrder = searchFilter.ViewOrder,
                IsCreatedBySystem = searchFilter.IsCreatedBySystem
            });
        }

        public async Task AddSearchFilterRangeAsync(Entities.SearchFilterRange searchFilterRange)
        {
            var valueMinMax = searchFilterRange.Min + "_" + searchFilterRange.Max;
            await _dbContext.SearchFilters.AddAsync(new Models.SearchFilter()
            {
                Id = searchFilterRange.Id,
                Name = searchFilterRange.Name,
                SearchFilterType = searchFilterRange.SearchFilterType,
                Values = valueMinMax,
                ViewOrder = searchFilterRange.ViewOrder,
                IsCreatedBySystem = searchFilterRange.IsCreatedBySystem
            });
        }

        public async Task<List<string>> GetCitiesAsync()
        {
            var fSearchFilterCity = await _dbContext.SearchFilters.FindAsync(ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_CITY);
            if (fSearchFilterCity == null)
            {
                return null;
            }
            return JsonConvert.DeserializeObject<List<string>>(fSearchFilterCity.Values);
        }

        public async Task<int> GetMaxOrderAsync()
        {
            var maxOrder = await _dbContext.SearchFilters.MaxAsync(sf => sf.ViewOrder);
            return maxOrder;
        }

        public async Task<List<SearchFilterCheckBox>> GetSearchFilterCheckBoxesAsync()
        {
            var searchFilters = await _dbContext.SearchFilters
                .Where(sf => sf.SearchFilterType == Entities.Enums.SearchFilterType.Checkbox)
                .ToListAsync();
            return searchFilters.Select(sf => new SearchFilterCheckBox
            {
                Id = sf.Id,
                Name = sf.Name,
                SearchFilterType = sf.SearchFilterType,
                Values = JsonConvert.DeserializeObject<List<string>>(sf.Values),
                ViewOrder = sf.ViewOrder,
                IsCreatedBySystem = sf.IsCreatedBySystem
            }).ToList();
        }

        public async Task<List<SearchFilterCombobox>> GetSearchFilterComboboxesAsync()
        {
            var searchFilters = await _dbContext.SearchFilters
                .Where(sf => sf.SearchFilterType == Entities.Enums.SearchFilterType.Combobox)
                .ToListAsync();
            return searchFilters.Select(sf => new SearchFilterCombobox
            {
                Id = sf.Id,
                Name = sf.Name,
                SearchFilterType = sf.SearchFilterType,
                Values = JsonConvert.DeserializeObject<List<string>>(sf.Values),
                ViewOrder = sf.ViewOrder,
                IsCreatedBySystem = sf.IsCreatedBySystem
            }).ToList();
        }

        public async Task<List<SearchFilterRange>> GetSearchFilterRangesAsync()
        {
            var searchFilters = await _dbContext.SearchFilters
                .Where(sf => sf.SearchFilterType == Entities.Enums.SearchFilterType.Range)
                .ToListAsync();
            return searchFilters.Select(sf => new SearchFilterRange
            {
                Id = sf.Id,
                Name = sf.Name,
                SearchFilterType = sf.SearchFilterType,
                Min = long.Parse(sf.Values.Split('_')[0]),
                Max = long.Parse(sf.Values.Split('_')[1]),
                ViewOrder = sf.ViewOrder,
                IsCreatedBySystem = sf.IsCreatedBySystem
            }).ToList();
        }

        public async Task<List<string>> GetSkillsForCommonAsync(GetSkillsQuery request)
        {
            var fSearchFilterSkill = await _dbContext.SearchFilters.FindAsync(ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_SKILL);
            if (fSearchFilterSkill == null)
            {
                return null;
            }
            return JsonConvert.DeserializeObject<List<string>>(fSearchFilterSkill.Values);
        }

        public async Task<List<string>> GetSkillsInSystem()
        {
            var fSearchFilterSkill = await _dbContext.SearchFilters.FindAsync(ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_SKILL);
            if (fSearchFilterSkill == null)
            {
                return null;
            }
            return JsonConvert.DeserializeObject<List<string>>(fSearchFilterSkill.Values);
        }



        //Tạm thời làm kiểu random
        public async Task<List<string>> GetSuggestedSkillsForCommonAsync(GetSuggestedSkillsQuery request)
        {
            var fSearchFilterSkill = await _dbContext.SearchFilters.FindAsync(ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_SKILL);
            if (fSearchFilterSkill == null)
            {
                return null;
            }

            var skillNames = JsonConvert.DeserializeObject<List<string>>(fSearchFilterSkill.Values);

            var randomSkills = skillNames.OrderBy(x => Guid.NewGuid())
                                         .Take(request.Count)
                                         .ToList();

            return randomSkills;
        }

       
    }
}
