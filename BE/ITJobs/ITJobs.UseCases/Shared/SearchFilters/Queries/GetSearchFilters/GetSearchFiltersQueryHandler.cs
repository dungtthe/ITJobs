using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ITJobs.UseCases.Shared.SearchFilters.Queries.GetSearchFilters.GetSearchFiltersResponeDto;

namespace ITJobs.UseCases.Shared.SearchFilters.Queries.GetSearchFilters
{
    public class GetSearchFiltersQueryHandler : IRequestHandler<GetSearchFiltersQuery, GetSearchFiltersResponeDto>
    {
        private readonly ISearchFilterRepository _searchFilterRepository;
        public GetSearchFiltersQueryHandler(ISearchFilterRepository searchFilterRepository)
        {
            _searchFilterRepository = searchFilterRepository;
        }
        public async Task<GetSearchFiltersResponeDto> Handle(GetSearchFiltersQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var searchFilterCheckbox = await _searchFilterRepository.GetSearchFilterCheckBoxesAsync();
                var searchFilterComboBox = await _searchFilterRepository.GetSearchFilterComboboxesAsync();
                var searchFilterRange = await _searchFilterRepository.GetSearchFilterRangesAsync();
                return new GetSearchFiltersResponeDto
                {
                    SearchFilterCheckBoxs = searchFilterCheckbox,
                    SearchFilterComboboxs = searchFilterComboBox,
                    SearchFilterRanges = searchFilterRange.Select(r => new SearchFilterRangeDto
                    {
                        Id = r.Id,
                        Name = r.Name,
                        Min = r.Min.ToString(),
                        Max = r.Max.ToString()
                    }).ToList()
                };

            }
            catch 
            {
                throw;
            }
        }
    }
}
