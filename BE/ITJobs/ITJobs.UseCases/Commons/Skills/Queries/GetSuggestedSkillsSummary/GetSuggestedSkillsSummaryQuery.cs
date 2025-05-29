using ITJobs.UseCases.Helpers.Paginations;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Commons.Skills.Queries.GetSuggestedSkillsSummary
{
    public class GetSuggestedSkillsSummaryQuery : BasePaginationParameters, IRequest<PagedResult<SkillSummaryDto>>
    {

    }
}
