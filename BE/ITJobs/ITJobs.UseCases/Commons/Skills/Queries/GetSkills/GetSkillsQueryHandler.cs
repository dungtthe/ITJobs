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

namespace ITJobs.UseCases.Commons.Skills.Queries.GetSkills
{
    public class GetSkillsQueryHandler : IRequestHandler<GetSkillsQuery, PagedResult<SkillDto>>
    {
        private readonly ISkillRepository _skillRepository;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;

        public GetSkillsQueryHandler(
            ISkillRepository skillRepository,
            IHttpContextInfoAccessor httpContextInfoAccessor)
        {
            _skillRepository = skillRepository;
            _httpContextInfoAccessor = httpContextInfoAccessor;
        }

        public async Task<PagedResult<SkillDto>> Handle(GetSkillsQuery request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "GetSkillsQueryHandler", JsonConvert.SerializeObject(request));

                var pagedResults = await _skillRepository.GetSkillsForCommonAsync(request);

                await LoggerHelper.LogInfomationAsync(ipClient, "GetSkillsQueryHandler", "thành công: " + JsonConvert.SerializeObject(request));

                return pagedResults;
            }
            catch
            {
                throw;
            }
        }
    }
}
