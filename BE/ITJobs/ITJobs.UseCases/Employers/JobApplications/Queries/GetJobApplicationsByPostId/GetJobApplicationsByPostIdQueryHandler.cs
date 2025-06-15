using ITJobs.UseCases.Helpers.Paginations;
using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.JobApplications.Queries.GetJobApplicationsByPostId
{
    public class GetJobApplicationsByPostIdQueryHandler : IRequestHandler<GetJobApplicationsByPostIdQuery, PagedResult<JobApplicationDto>>
    {
        private readonly IJobApplicationRepository _jobApplicationRepository;
        private readonly IPostRepository _postRepository;
        public GetJobApplicationsByPostIdQueryHandler(IJobApplicationRepository jobApplicationRepository, IPostRepository postRepository)
        {
            _jobApplicationRepository = jobApplicationRepository;
            _postRepository = postRepository;
        }
        public async Task<PagedResult<JobApplicationDto>> Handle(GetJobApplicationsByPostIdQuery request, CancellationToken cancellationToken)
        {
            if(!await _postRepository.IsPostOwnedByEmployerAsync(request.PostId, request.UserId))
            {
                throw new Entities.Exceptions.PostNotFoundException();
            }
            return await _jobApplicationRepository.GetJobApplicationsByPostIdAsync(request);
        }
    }
}
