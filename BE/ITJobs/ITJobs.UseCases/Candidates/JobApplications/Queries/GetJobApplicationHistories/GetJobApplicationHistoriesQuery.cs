using ITJobs.UseCases.Helpers.Paginations;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.JobApplications.Queries.GetJobApplicationHistories
{
    public class GetJobApplicationHistoriesQuery:BasePaginationParameters, IRequest<PagedResult<JobApplicationHistoryDto>>
    {
        public Guid? UserId { get; set; }//userid cua candidate
    }
}
