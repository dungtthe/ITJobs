using ITJobs.UseCases.Helpers.Paginations;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.Employers.Queries.GetTopEmployersByApplicationsSummary
{
    public class GetTopEmployersByApplicationsSummaryQuery : BasePaginationParameters, IRequest<PagedResult<EmployerSummaryDto>>
    {

    }
}
