using ITJobs.Entities.Exceptions;
using ITJobs.Infrastructure.Commons.Helpers;
using ITJobs.UseCases.Interfaces.ExternalServices;
using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.CompanyProfiles.Commands.UpdateCompanyIntroduction
{
    public class UpdateCompanyIntroductionCommandHandler : IRequestHandler<UpdateCompanyIntroductionCommand, string>
    {
        private readonly IEmployerRepository _employerRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;
        public UpdateCompanyIntroductionCommandHandler(IEmployerRepository employerRepository, IUnitOfWork unitOfWork, IHttpContextInfoAccessor httpContextInfoAccessor)
        {
            _employerRepository = employerRepository;
            _unitOfWork = unitOfWork;
            _httpContextInfoAccessor = httpContextInfoAccessor;
        }


        public async Task<string> Handle(UpdateCompanyIntroductionCommand request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "UpdateGeneralInfosCommandHandler", JsonConvert.SerializeObject(request));

                await _unitOfWork.BeginTransactionAsync();
                var content = Security.SanitizeHtmlContent(request.CompanyIntroduction);
                var result = await _employerRepository.UpdateCompanyIntroductionAsync(request.UserId.Value, content);
                if (!result)
                {
                    await LoggerHelper.LogInfomationAsync(ipClient, "UpdateCompanyIntroductionCommandHandler", "Cập nhật giới thiệu công ty thất bại không tìm thấy user: " + JsonConvert.SerializeObject(request));
                    throw new UserNotFoundException();
                }
                await _unitOfWork.CommitAsync();

                await LoggerHelper.LogInfomationAsync(ipClient, "UpdateCompanyIntroductionCommandHandler", "Cập nhật giới thiệu công ty thành công: " + JsonConvert.SerializeObject(request));

                return Security.DeSanitizeHtmlContent(content);
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
