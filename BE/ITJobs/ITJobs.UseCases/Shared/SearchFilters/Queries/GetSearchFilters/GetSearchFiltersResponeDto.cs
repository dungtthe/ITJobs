using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.SearchFilters.Queries.GetSearchFilters
{
    public class GetSearchFiltersResponeDto
    {
        public List<SearchFilterRangeDto> SearchFilterRanges { get; set; } = new List<SearchFilterRangeDto>();
        public List<Entities.SearchFilterCheckBox> SearchFilterCheckBoxs { get; set; } = new List<Entities.SearchFilterCheckBox>();
        public List<Entities.SearchFilterCombobox> SearchFilterComboboxs { get; set; } = new List<Entities.SearchFilterCombobox>();

        public class SearchFilterRangeDto:Entities.SearchFilter
        {
            public string Min { get; set; }
            public string Max { get; set; }

            public SearchFilterRangeDto()
            {
                SearchFilterType = Entities.Enums.SearchFilterType.Range;
            }
        }
    }
}
