using ITJobs.UseCases.Commons.Skills.Queries.GetSkills;
using ITJobs.UseCases.Commons.Skills.Queries.GetSuggestedSkillsSummary;
using ITJobs.UseCases.Helpers.Paginations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.Repositories
{
    public interface ISkillRepository
    {
        #region common
        Task<PagedResult<SkillSummaryDto>> GetSuggestedSkillsSummarForCommonAsync(GetSuggestedSkillsSummaryQuery request);
        Task<PagedResult<SkillDto>> GetSkillsForCommonAsync(GetSkillsQuery request);
        #endregion
    }
}
