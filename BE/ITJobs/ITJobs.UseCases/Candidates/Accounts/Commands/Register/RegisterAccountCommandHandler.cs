using FluentValidation;
using FluentValidation.Results;
using ITJobs.Entities.Enums;
using ITJobs.Infrastructure.Commons.Consts;
using ITJobs.Infrastructure.Commons.Helpers;
using ITJobs.UseCases.Commons;
using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.Services;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.Register
{

    public class RegisterAccountCommandHandler : IRequestHandler<RegisterAccountCommand, ResponeMessage>
    {
        private readonly IAppUserRepository _appUserRepository;
        private readonly ICandidateRepository _candidateRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;
        public RegisterAccountCommandHandler(IAppUserRepository appUserRepository, ICandidateRepository candidateRepository, IUnitOfWork unitOfWork, IHttpContextInfoAccessor httpContextInfoAccessor)
        {
            _appUserRepository = appUserRepository;
            _candidateRepository = candidateRepository;
            _unitOfWork = unitOfWork;
            _httpContextInfoAccessor = httpContextInfoAccessor;
        }



        public async Task<ResponeMessage> Handle(RegisterAccountCommand request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient,"Handle(RegisterAccountCommand request, CancellationToken cancellationToken)", JsonConvert.SerializeObject(request));

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
                await _appUserRepository.RegisterAsync(id, request.UserName, Security.HashPassword(request.Password), request.Email, request.FullName, RoleType.Candidate);
                await _candidateRepository.AddAsync(id);
                await _unitOfWork.CommitAsync();

                await LoggerHelper.LogInfomationAsync(ipClient, "Handle(RegisterAccountCommand request, CancellationToken cancellationToken)", "đăng ký thành công: " + JsonConvert.SerializeObject(request));

                return new ResponeMessage()
                {
                    HttpStatusCode = HttpStatusCode.Ok,
                    Message = "Đăng ký tài khoản thành công"
                };
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
