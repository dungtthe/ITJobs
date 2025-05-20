using ITJobs.Entities.Enums;
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

namespace ITJobs.UseCases.Admins.Users.Employers.Commands.LockAccountEmployer
{
    public class LockAccountEmployerHandler : IRequestHandler<LockAccountEmployerCommand, string>
    {
        private readonly IEmployerRepository _employerRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;
        public LockAccountEmployerHandler(IEmployerRepository employerRepository, IUnitOfWork unitOfWork, IHttpContextInfoAccessor httpContextInfoAccessor)
        {
            _employerRepository = employerRepository;
            _unitOfWork = unitOfWork;
            _httpContextInfoAccessor = httpContextInfoAccessor;
        }

        public async Task<string> Handle(LockAccountEmployerCommand request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "LockAccountEmployerHandler", JsonConvert.SerializeObject(request));


                await _unitOfWork.BeginTransactionAsync();

                var rs = await _employerRepository.LockAccountAsync(request.UserId);
                if (!rs)
                {
                    throw (new UserNotFoundException($"Không tìm thấy nhà tuyển dụng. Vui lòng thử lại"));
                }
                await _unitOfWork.CommitAsync();

                await LoggerHelper.LogInfomationAsync(ipClient, "LockAccountEmployerHandler", "khóa account thành công: " + JsonConvert.SerializeObject(request));

                return "Khóa tài khoản thành công";
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
