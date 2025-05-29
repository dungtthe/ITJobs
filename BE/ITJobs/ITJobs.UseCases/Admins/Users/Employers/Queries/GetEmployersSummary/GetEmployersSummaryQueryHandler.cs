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

namespace ITJobs.UseCases.Admins.Users.Employers.Queries.GetEmployersSummary
{
    public class GetEmployersSummaryQueryHandler : IRequestHandler<GetEmployersSummaryQuery, PagedResult<EmployerSummaryDto>>
    {
        private readonly IEmployerRepository _employerRepository;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;

        public GetEmployersSummaryQueryHandler(IEmployerRepository employerRepository, IHttpContextInfoAccessor httpContextInfoAccessor)
        {
            _employerRepository = employerRepository;
            _httpContextInfoAccessor = httpContextInfoAccessor;
        }

        public async Task<PagedResult<EmployerSummaryDto>> Handle(GetEmployersSummaryQuery request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "GetEmployersSummaryQueryHandler", JsonConvert.SerializeObject(request));

                var pagedResults = await _employerRepository.GetEmployersSummarAsync(request);

                await LoggerHelper.LogInfomationAsync(ipClient, "GetEmployersSummaryQueryHandler", "thành công: " + JsonConvert.SerializeObject(request));

                return pagedResults;
            }
            catch
            {
                throw;
            }
        }
    }
}
