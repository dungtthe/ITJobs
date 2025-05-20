using FluentValidation;
using FluentValidation.Results;
using ITJobs.Entities.Enums;
using ITJobs.Infrastructure.Commons.Consts;
using ITJobs.Infrastructure.Commons.Helpers;
using ITJobs.UseCases.Commons;
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

namespace ITJobs.UseCases.Admins.Users.Employers.Commands.CreateEmployer
{
    public class CreateEmployerCommandHandler : IRequestHandler<CreateEmployerCommand, Guid>
    {
        private readonly IAppUserRepository _appUserRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IEmployerRepository _employerRepository;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;
        public CreateEmployerCommandHandler(IAppUserRepository userRepository, IUnitOfWork unitOfWork, IEmployerRepository employerRepository,IHttpContextInfoAccessor httpContextInfoAccessor)
        {
            _appUserRepository = userRepository;
            _unitOfWork = unitOfWork;
            _employerRepository = employerRepository;
            _httpContextInfoAccessor = httpContextInfoAccessor;
        }
        public async Task<Guid> Handle(CreateEmployerCommand request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "CreateEmployerCommandHandler", JsonConvert.SerializeObject(request));

                if (await _appUserRepository.IsUserNameExistsAsync(request.UserName))
                {
                    throw new ValidationException(new List<ValidationFailure>
                                                    {
                                                        new ValidationFailure("UserName", "Tên tài khoản đã có người sử dụng."),
                                                    });
                }

                if (await _appUserRepository.IsEmailExistsAsync(request.Email))
                {
                    throw new ValidationException(new List<ValidationFailure>
                                                    {
                                                        new ValidationFailure("Email", "Email đã có người sử dụng."),
                                                    });
                }

                await _unitOfWork.BeginTransactionAsync();
                var id = Guid.NewGuid();
                var passGenerated = PasswordGenerator.Generate();
                await _appUserRepository.RegisterAsync(id, request.UserName, Security.HashPassword(passGenerated), request.Email, request.FullName, RoleType.Employer);
                await _employerRepository.AddAsync(id,request.FullName);
                await _unitOfWork.CommitAsync();

                await LoggerHelper.LogInfomationAsync(ipClient, "Handle(RegisterAccountCommand request, CancellationToken cancellationToken)", "đăng ký thành công: " + JsonConvert.SerializeObject(request));

                return id;
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
