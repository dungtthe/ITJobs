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

namespace ITJobs.UseCases.Employers.CompanyProfiles.Commands.UpdateLocations
{
    public class UpdateLocationsCommandHandler : IRequestHandler<UpdateLocationsCommand, Unit>
    {
        private readonly IEmployerRepository _employerRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;
        public UpdateLocationsCommandHandler(IEmployerRepository employerRepository, IUnitOfWork unitOfWork, IHttpContextInfoAccessor httpContextInfoAccessor)
        {
            _employerRepository = employerRepository;
            _unitOfWork = unitOfWork;
            _httpContextInfoAccessor = httpContextInfoAccessor;
        }
        public async Task<Unit> Handle(UpdateLocationsCommand request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "UpdateLocationsCommandHandler", JsonConvert.SerializeObject(request));

                await _unitOfWork.BeginTransactionAsync();
                var result = await _employerRepository.UpdateLocationsAsync(request.UserId.Value, request.Locations);
                if (!result)
                {
                    await LoggerHelper.LogInfomationAsync(ipClient, "UpdateLocationsCommandHandler", "Cập nhật địa điểm thất bại không tìm thấy user: " + JsonConvert.SerializeObject(request));
                    throw new UserNotFoundException();
                }

                await LoggerHelper.LogInfomationAsync(ipClient, "UpdateLocationsCommandHandler", "Cập nhật địa điểm thành công: " + JsonConvert.SerializeObject(request));
                await _unitOfWork.CommitAsync();
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
