using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.SearchFilters.Queries.GetCities
{
    public class GetCitiesQuery : IRequest<List<string>>
    {
    }
}
