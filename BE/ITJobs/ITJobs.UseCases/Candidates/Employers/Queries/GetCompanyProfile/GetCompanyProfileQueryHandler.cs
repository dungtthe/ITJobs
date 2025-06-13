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

namespace ITJobs.UseCases.Candidates.Employers.Queries.GetCompanyProfile
{
    public class GetCompanyProfileQueryHandler : IRequestHandler<GetCompanyProfileQuery, CompanyProfileDto>
    {
        private readonly IEmployerRepository _employerRepository;
        public GetCompanyProfileQueryHandler(IEmployerRepository employerRepository)
        {
            _employerRepository = employerRepository;
        }
        public async Task<CompanyProfileDto> Handle(GetCompanyProfileQuery request, CancellationToken cancellationToken)
        {
            var companyProfile = await _employerRepository.GetCompanyProfileForCandidateAsync(request.UserId);
            if (companyProfile == null)
            {
                throw new UserNotFoundException("Không tìm thấy thông tin của công ty. Vui lòng thử lại sau");
            }
            companyProfile.CompanyIntroduction = Security.DeSanitizeHtmlContent(companyProfile.CompanyIntroduction);
            return companyProfile;
        }
    }
}
