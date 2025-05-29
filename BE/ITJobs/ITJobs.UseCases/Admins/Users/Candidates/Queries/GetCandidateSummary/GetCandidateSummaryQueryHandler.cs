using ITJobs.Infrastructure.Commons.Helpers;
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
    public class GetCandidateSummaryQueryHandler : IRequestHandler<GetCandidateSummaryQuery, List<CandidateSummaryDto>>
    {
        private readonly ICandidateRepository _candidateRepository;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;
        public GetCandidateSummaryQueryHandler(ICandidateRepository candidateRepository, IHttpContextInfoAccessor httpContextInfoAccessor)
        {
            _candidateRepository = candidateRepository;
            _httpContextInfoAccessor = httpContextInfoAccessor;
        }

        public async Task<List<CandidateSummaryDto>> Handle(GetCandidateSummaryQuery request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "GetCandidateSummaryQueryHandler", JsonConvert.SerializeObject(request));

                var candidates = await _candidateRepository.GetCandidatesSummarAsync();

                await LoggerHelper.LogInfomationAsync(ipClient, "GetCandidateSummaryQueryHandler", "thành công: " + JsonConvert.SerializeObject(request));

                return candidates;
            }
            catch
            {
                throw;
            }
        }
    }
}
