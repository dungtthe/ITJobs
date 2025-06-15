using ITJobs.UseCases.Helpers.Paginations;
using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.JobApplications.Queries.GetJobApplicationHistories
{
    public class GetJobApplicationHistoriesQueryHandler : IRequestHandler<GetJobApplicationHistoriesQuery, PagedResult<JobApplicationHistoryDto>>
    {
        private readonly IJobApplicationRepository _jobApplicationRepository;
        public GetJobApplicationHistoriesQueryHandler(IJobApplicationRepository jobApplicationRepository)
        {
            _jobApplicationRepository = jobApplicationRepository;
        }
        public async Task<PagedResult<JobApplicationHistoryDto>> Handle(GetJobApplicationHistoriesQuery request, CancellationToken cancellationToken)
        {
            return await _jobApplicationRepository.GetJobApplicationHistoriesAsync(request);
        }
    }
}
