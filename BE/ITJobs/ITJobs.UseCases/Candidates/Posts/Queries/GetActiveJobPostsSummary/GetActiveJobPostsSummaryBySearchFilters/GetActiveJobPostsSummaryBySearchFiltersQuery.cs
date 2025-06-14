using ITJobs.UseCases.Helpers.Paginations;
using ITJobs.UseCases.Shared.ShareDtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary.GetActiveJobPostsSummaryBySearchFilters
{
    public class GetActiveJobPostsSummaryBySearchFiltersQuery : BasePaginationParameters, IRequest<PagedResult<JobPostsSummaryDto>>
    {
        public List<SearchFilterRangeDto> SearchFilterRanges { get; set; } = new List<SearchFilterRangeDto>();
        public List<SearchFilterCheckBoxDto> SearchFilterCheckBoxs { get; set; } = new List<SearchFilterCheckBoxDto>();
        public List<SearchFilterComboboxDto> SearchFilterComboboxs { get; set; } = new List<SearchFilterComboboxDto>();
    }
}
