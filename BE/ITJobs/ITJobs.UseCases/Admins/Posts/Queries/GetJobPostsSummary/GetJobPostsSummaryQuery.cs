using ITJobs.UseCases.Helpers.Paginations;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.Posts.Queries.GetJobPostsSummary
{
    public class GetJobPostsSummaryQuery : BasePaginationParameters, IRequest<PagedResult<JobPostSummaryDto>>
    {
        public Guid? UserId { get; set; } // loc theo cong ty
    }
}
