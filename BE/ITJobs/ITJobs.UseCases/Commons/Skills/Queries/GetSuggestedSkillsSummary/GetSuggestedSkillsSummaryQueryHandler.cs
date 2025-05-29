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

namespace ITJobs.UseCases.Commons.Skills.Queries.GetSuggestedSkillsSummary
{
    public class GetSuggestedSkillsSummaryQueryHandler : IRequestHandler<GetSuggestedSkillsSummaryQuery, PagedResult<SkillSummaryDto>>
    {
        private readonly ISkillRepository _skillRepository;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;

        public GetSuggestedSkillsSummaryQueryHandler(ISkillRepository skillRepository, IHttpContextInfoAccessor httpContextInfoAccessor)
        {
            _skillRepository = skillRepository;
            _httpContextInfoAccessor = httpContextInfoAccessor;
        }

        public async Task<PagedResult<SkillSummaryDto>> Handle(GetSuggestedSkillsSummaryQuery request, CancellationToken cancellationToken)
        {

            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "GetSuggestedSkillsSummaryQueryHandler", JsonConvert.SerializeObject(request));

                var pagedResults = await _skillRepository.GetSuggestedSkillsSummarForCommonAsync(request);

                await LoggerHelper.LogInfomationAsync(ipClient, "GetSuggestedSkillsSummaryQueryHandler", "thành công: " + JsonConvert.SerializeObject(request));

                return pagedResults;
            }
            catch
            {
                throw;
            }
        }
    }
}
