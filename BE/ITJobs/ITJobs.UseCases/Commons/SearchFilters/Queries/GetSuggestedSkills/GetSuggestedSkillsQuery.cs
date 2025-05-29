using ITJobs.UseCases.Helpers.Paginations;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Commons.SearchFilters.Queries.GetSuggestedSkills
{
    public class GetSuggestedSkillsQuery :IRequest<List<string>>
    {
        public int Count { get; set; }
    }
}
