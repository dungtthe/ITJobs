using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Queries.GetCVs
{
    public class GetCVsQuery:IRequest<List<Entities.CV>>
    {
        public Guid ?UserId { get; set; } 
    }
}
