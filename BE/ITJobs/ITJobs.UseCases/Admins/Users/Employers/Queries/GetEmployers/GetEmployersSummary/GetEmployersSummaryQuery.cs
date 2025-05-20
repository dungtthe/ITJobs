using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.Users.Employers.Queries.GetEmployers.GetEmployersSummary
{
    public class GetEmployersSummaryQuery : IRequest<List<EmployerSummaryDto>>
    {
    }
}
