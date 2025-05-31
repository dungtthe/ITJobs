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

namespace ITJobs.UseCases.Employers.CompanyProfiles.Queries.GetCompanyProfile
{
    public class GetCompanyProfileQueryHandler : IRequestHandler<GetCompanyProfileQuery, CompanyProfileDto>
    {
        private readonly IEmployerRepository _employerRepository;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;
        public GetCompanyProfileQueryHandler(IEmployerRepository employerRepository, IHttpContextInfoAccessor httpContextInfoAccessor)
        {
            _employerRepository = employerRepository;
            _httpContextInfoAccessor = httpContextInfoAccessor;
        }

        public async Task<CompanyProfileDto> Handle(GetCompanyProfileQuery request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "GetCompanyProfileQueryHandler", JsonConvert.SerializeObject(request));

                var companyProfile = await _employerRepository.GetCompanyProfileAsync(request.UserId.Value);
                if (companyProfile == null)
                {
                    await LoggerHelper.LogInfomationAsync(ipClient, "GetCompanyProfileQueryHandler", "Không tìm thấy thông tin của công ty: " + JsonConvert.SerializeObject(request));
                    throw new UserNotFoundException("Không tìm thấy thông tin của công ty. Vui lòng liên hệ admin");
                }
                await LoggerHelper.LogInfomationAsync(ipClient, "GetCompanyProfileQueryHandler", "thành công: " + JsonConvert.SerializeObject(request));
                return companyProfile;
            }
            catch
            {
                throw;
            }
        }
    }
}
