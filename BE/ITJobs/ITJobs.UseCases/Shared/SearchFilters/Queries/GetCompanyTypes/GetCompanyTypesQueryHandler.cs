using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.SearchFilters.Queries.GetCompanyTypes
{
    public class GetCompanyTypesQueryHandler : IRequestHandler<GetCompanyTypesQuery, List<string>>
    {
        private readonly ISearchFilterRepository _searchFilterRepository;
        public GetCompanyTypesQueryHandler(ISearchFilterRepository searchFilterRepository)
        {
            _searchFilterRepository = searchFilterRepository;
        }
        public async Task<List<string>> Handle(GetCompanyTypesQuery request, CancellationToken cancellationToken)
        {
            return await _searchFilterRepository.GetCompanyTypesAsync();
        }
    }
}
