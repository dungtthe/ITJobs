using ITJobs.UseCases.Helpers.Paginations;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.JobApplications.Queries.GetJobApplicationsByPostId
{
    public class GetJobApplicationsByPostIdQuery : BasePaginationParameters, IRequest<PagedResult<JobApplicationDto>>
    {
        public Guid UserId { get; set; } // userid cua employer
        public Guid PostId { get; set; }
        public Entities.Enums.StatusJobApplication? StatusJobApplication { get; set; } 
    }
}
