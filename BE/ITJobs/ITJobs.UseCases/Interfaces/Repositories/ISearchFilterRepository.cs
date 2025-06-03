using ITJobs.Entities;
using ITJobs.UseCases.Helpers.Paginations;
using ITJobs.UseCases.Shared.SearchFilters.Queries.GetSkills;
using ITJobs.UseCases.Shared.SearchFilters.Queries.GetSuggestedSkills;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.Repositories
{
    public interface ISearchFilterRepository
    {
        Task AddSearchFilterCheckboxOrComboboxAsync(SearchFilter searchFilter);
        Task AddSearchFilterRangeAsync(Entities.SearchFilterRange searchFilterRange);
        Task<int> GetMaxOrderAsync();
        Task<List<string>> GetSuggestedSkillsForCommonAsync(GetSuggestedSkillsQuery request);
        Task<List<string>> GetSkillsForCommonAsync(GetSkillsQuery request);
        Task<List<string>> GetSkillsInSystem();
        Task<List<string>> GetCitiesAsync();
    }
}
