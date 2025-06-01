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

namespace ITJobs.UseCases.Employers.CompanyProfiles.Commands.UpdateGeneralInfos
{
    public class UpdateGeneralInfosCommandHandler : IRequestHandler<UpdateGeneralInfosCommand, List<Entities.GeneralInfoItem>>
    {
        private readonly IEmployerRepository _employerRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;
        public UpdateGeneralInfosCommandHandler(IEmployerRepository employerRepository, IUnitOfWork unitOfWork, IHttpContextInfoAccessor httpContextInfoAccessor)
        {
            _employerRepository = employerRepository;
            _unitOfWork = unitOfWork;
            _httpContextInfoAccessor = httpContextInfoAccessor;
        }
        public async Task<List<Entities.GeneralInfoItem>> Handle(UpdateGeneralInfosCommand request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "UpdateGeneralInfosCommandHandler", JsonConvert.SerializeObject(request));

                var checkExistEmployer = await _employerRepository.EmployerExistsAsync(request.UserId.Value);
                if (!checkExistEmployer)
                {
                    await LoggerHelper.LogInfomationAsync(ipClient, "UpdateCompanyIntroductionCommandHandler", "Cập nhật giới thiệu công ty thất bại không tìm thấy user: " + JsonConvert.SerializeObject(request));
                    throw new UserNotFoundException();
                }

                await _unitOfWork.BeginTransactionAsync();

                await _employerRepository.UpdateGeneralInfosAsync(request.UserId.Value, request.GeneralInfos);

                await LoggerHelper.LogInfomationAsync(ipClient, "UpdateGeneralInfosCommandHandler", "Cập nhật thông tin chung thành công: " + JsonConvert.SerializeObject(request));
                await _unitOfWork.CommitAsync();
                return request.GeneralInfos;
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
