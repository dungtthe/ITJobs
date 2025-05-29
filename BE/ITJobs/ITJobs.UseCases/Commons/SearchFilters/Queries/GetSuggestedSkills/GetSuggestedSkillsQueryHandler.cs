using ITJobs.Entities.Exceptions;
using ITJobs.Infrastructure.Commons.Helpers;
using ITJobs.UseCases.Admins.Users.Employers.Queries.GetEmployersSummary;
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

namespace ITJobs.UseCases.Commons.SearchFilters.Queries.GetSuggestedSkills
{
    public class GetSuggestedSkillsQueryHandler : IRequestHandler<GetSuggestedSkillsQuery, List<string>>
    {
        private readonly ISearchFilterRepository _searchFilterRepository;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;

        public GetSuggestedSkillsQueryHandler(ISearchFilterRepository searchFilterRepository, IHttpContextInfoAccessor httpContextInfoAccessor)
        {
            _searchFilterRepository = searchFilterRepository;
            _httpContextInfoAccessor = httpContextInfoAccessor;
        }
        public async Task<List<string>> Handle(GetSuggestedSkillsQuery request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "GetSuggestedSkillsQueryHandler", JsonConvert.SerializeObject(request));
                if (request.Count < 0)
                {
                    request.Count = 0;
                }
                var result = await _searchFilterRepository.GetSuggestedSkillsForCommonAsync(request);
                if (result == null)
                {
                    throw new SystemDataNotImplementedException("Chưa seed dữ liệu cho skills ở searchfilter");
                }
                await LoggerHelper.LogInfomationAsync(ipClient, "GetSuggestedSkillsQueryHandler", "thành công: " + JsonConvert.SerializeObject(request));
                return result;

            }
            catch
            {
                throw;
            }


        }
    }
}
