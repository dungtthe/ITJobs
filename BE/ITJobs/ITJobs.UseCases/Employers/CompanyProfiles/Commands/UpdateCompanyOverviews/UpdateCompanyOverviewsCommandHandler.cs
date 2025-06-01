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

namespace ITJobs.UseCases.Employers.CompanyProfiles.Commands.UpdateCompanyOverviews
{
    public class UpdateCompanyOverviewsCommandHandler : IRequestHandler<UpdateCompanyOverviewsCommand, Unit>
    {
        private readonly IEmployerRepository _employerRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;
        private readonly IAppUserRepository _appUserRepository;
        public UpdateCompanyOverviewsCommandHandler(IEmployerRepository employerRepository, IUnitOfWork unitOfWork, IHttpContextInfoAccessor httpContextInfoAccessor, IAppUserRepository appUserRepository)
        {
            _employerRepository = employerRepository;
            _unitOfWork = unitOfWork;
            _httpContextInfoAccessor = httpContextInfoAccessor;
            _appUserRepository = appUserRepository;
        }

        public async Task<Unit> Handle(UpdateCompanyOverviewsCommand request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "UpdateCompanyOverviewsCommandHandler", JsonConvert.SerializeObject(request));

                var checkExistEmployer = await _employerRepository.EmployerExistsAsync(request.UserId.Value);
                if (!checkExistEmployer)
                {
                    await LoggerHelper.LogInfomationAsync(ipClient, "UpdateCompanyOverviewsCommandHandler", "Cập nhật tổng quan công ty thất bại không tìm thấy user: " + JsonConvert.SerializeObject(request));
                    throw new UserNotFoundException();
                }

                var checkExistPhone = await _appUserRepository.UserExistByPhoneNumberAsync(request.PhoneNumber,request.UserId.Value);
                if (checkExistPhone)
                {
                    await LoggerHelper.LogInfomationAsync(ipClient, "UpdateCompanyOverviewsCommandHandler", "Cập nhật tổng quan công ty thất bại số điện thoại đã được sử dụng: " + JsonConvert.SerializeObject(request));
                    throw new PhoneNumberAlreadyExistsException("Số điện thoại đã được sử dụng bởi người dùng khác.");
                }
                await _unitOfWork.BeginTransactionAsync();

                await _employerRepository.UpdateOverView(request.UserId.Value, request.PhoneNumber, request.CompanyName, request.WebsiteUrl, request.CompanyType);

                await _unitOfWork.CommitAsync();

                await LoggerHelper.LogInfomationAsync(ipClient, "UpdateCompanyOverviewsCommandHandler", "Cập nhật tổng quan công ty thành công: " + JsonConvert.SerializeObject(request));

                return Unit.Value;
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
