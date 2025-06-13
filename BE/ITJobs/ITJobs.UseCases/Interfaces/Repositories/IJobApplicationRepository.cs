using ITJobs.UseCases.Candidates.JobApplications.Commands.AddJobApplication;
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
        Task<List<(Guid PostId, int ApplicationCount)>> GetTopPostsByApplicationsCountAsync();
    }
}
