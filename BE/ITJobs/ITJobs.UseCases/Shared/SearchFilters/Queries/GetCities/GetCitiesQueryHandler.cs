using ITJobs.Entities.Exceptions;
using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.SearchFilters.Queries.GetCities
{
    public class GetCitiesQueryHandler : IRequestHandler<GetCitiesQuery, List<string>>
    {
        private readonly ISearchFilterRepository _searchFilterRepository;       
        public GetCitiesQueryHandler(ISearchFilterRepository searchFilterRepository)
        {
            _searchFilterRepository = searchFilterRepository;
        }
        public async Task<List<string>> Handle(GetCitiesQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var result = await _searchFilterRepository.GetCitiesAsync();
                if (result == null)
                {
                    throw new SystemDataNotImplementedException("Chưa seed dữ liệu cho cities ở searchfilter");
                }
                return result;
            }
            catch
            {
                throw;
            }
        }
    }
}
