using ITJobs.Entities.Exceptions;
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

namespace ITJobs.UseCases.Shared.SearchFilters.Queries.GetSkills
{
    public class GetSkillsQueryHandler : IRequestHandler<GetSkillsQuery, List<string>>
    {
        private readonly ISearchFilterRepository _searchFilterRepository;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;

        public GetSkillsQueryHandler(ISearchFilterRepository searchFilterRepository, IHttpContextInfoAccessor httpContextInfoAccessor)
        {
            _searchFilterRepository = searchFilterRepository;
            _httpContextInfoAccessor = httpContextInfoAccessor;
        }
        public async Task<List<string>> Handle(GetSkillsQuery request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "GetSkillsQueryHandler", JsonConvert.SerializeObject(request));
                var result = await _searchFilterRepository.GetSkillsForCommonAsync(request);
                if (result == null)
                {
                    throw new SystemDataNotImplementedException("Chưa seed dữ liệu cho skills ở searchfilter");
                }
                await LoggerHelper.LogInfomationAsync(ipClient, "GetSkillsQueryHandler", "thành công: " + JsonConvert.SerializeObject(request));
                return result;
            }
            catch
            {
                throw;
            }
        }
    }
}
