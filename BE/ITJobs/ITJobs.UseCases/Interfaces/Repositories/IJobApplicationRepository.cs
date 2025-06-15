using ITJobs.UseCases.Candidates.JobApplications.Commands.AddJobApplication;
using ITJobs.UseCases.Employers.JobApplications.Queries.GetJobApplicationsByPostId;
using ITJobs.UseCases.Helpers.Paginations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.Repositories
{
    public interface IJobApplicationRepository
    {
        Task AddJobApplicationAsync(AddJobApplicationCommand request, Guid idAdd);
        Task<PagedResult<JobApplicationDto>> GetJobApplicationsByPostIdAsync(GetJobApplicationsByPostIdQuery request);
        Task<List<(Guid PostId, int ApplicationCount)>> GetTopPostsByApplicationsCountAsync();
    }
}
