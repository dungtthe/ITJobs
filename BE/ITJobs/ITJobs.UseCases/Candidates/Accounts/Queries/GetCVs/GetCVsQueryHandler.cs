using ITJobs.Entities;
using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Queries.GetCVs
{
    public class GetCVsQueryHandler : IRequestHandler<GetCVsQuery, List<Entities.CV>>
    {
        private readonly ICandidateRepository _candidateRepository;
        public GetCVsQueryHandler(ICandidateRepository candidateRepository)
        {
            _candidateRepository = candidateRepository;
        }
        public async Task<List<CV>> Handle(GetCVsQuery request, CancellationToken cancellationToken)
        {
            return await _candidateRepository.GetCVsAsync(request.UserId.Value);
        }
    }
}
