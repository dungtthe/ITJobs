using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary.GetActiveJobPostsSummaryByUserId
{
    public class GetActiveJobPostsSummaryByUserIdQuery:IRequest<List<JobPostsSummaryDto>>
    {
        public Guid UserId { get; set; } // id user cua employer
    }
}
