using ITJobs.Infrastructure.Commons.Helpers;
using ITJobs.UseCases.Helpers.Paginations;
using ITJobs.UseCases.Interfaces.ExternalServices;
using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.Users.Candidates.Queries.GetCandidateSummary
{
    public class GetCandidateSummaryQueryHandler :IRequestHandler<GetCandidateSummaryQuery, PagedResult<CandidateSummaryDto>>
    {
        private readonly ICandidateRepository _candidateRepository;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;
        public GetCandidateSummaryQueryHandler(ICandidateRepository candidateRepository, IHttpContextInfoAccessor httpContextInfoAccessor)
        {
            _candidateRepository = candidateRepository;
            _httpContextInfoAccessor = httpContextInfoAccessor;
        }

        public async Task<PagedResult<CandidateSummaryDto>> Handle(GetCandidateSummaryQuery request, CancellationToken cancellationToken)
        {
            return await _candidateRepository.GetCandidatesSummaryForAdminAsync(request);
        }
    }
}
