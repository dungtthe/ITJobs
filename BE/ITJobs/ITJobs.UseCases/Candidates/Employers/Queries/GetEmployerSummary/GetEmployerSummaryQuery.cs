using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Employers.Queries.GetEmployerSummary
{
    public class GetEmployerSummaryQuery:IRequest<EmployerSummaryDto>
    {
        public Guid UserId { get; set; }
    }
}
