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

namespace ITJobs.UseCases.Commons.Accounts.Commands
{
    public class UpdateImageCommandHandler : IRequestHandler<UpdateImageCommand, Unit>
    {
        private readonly IAppUserRepository _appUserRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;
        public UpdateImageCommandHandler(IAppUserRepository appUserRepository, IUnitOfWork unitOfWork, IHttpContextInfoAccessor httpContextInfoAccessor)
        {
            _appUserRepository = appUserRepository;
            _unitOfWork = unitOfWork;
            _httpContextInfoAccessor = httpContextInfoAccessor;
        }
        public async Task<Unit> Handle(UpdateImageCommand request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "UpdateImageCommandHandler", request.UserId.Value.ToString());

                var checkExistUser = await _appUserRepository.UserExistsAsync(request.UserId.Value);
                if (!checkExistUser)
                {
                    await LoggerHelper.LogInfomationAsync(ipClient, "UpdateImageCommandHandler", "Cập nhật hình ảnh thất bại không tìm thấy user: " + request.UserId.Value.ToString());
                    throw new UserNotFoundException();
                }
                await _unitOfWork.BeginTransactionAsync();
                await _appUserRepository.UpdateImageAsync(request.UserId.Value, request.Image);
                await LoggerHelper.LogInfomationAsync(ipClient, "UpdateImageCommandHandler", "Cập nhật hình ảnh thành công: " + request.UserId.Value.ToString());
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
