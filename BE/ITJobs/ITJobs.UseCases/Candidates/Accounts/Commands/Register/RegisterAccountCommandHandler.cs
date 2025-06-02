using FluentValidation;
using FluentValidation.Results;
using ITJobs.Entities.Enums;
using ITJobs.Entities.Exceptions;
using ITJobs.Infrastructure.Commons.Consts;
using ITJobs.Infrastructure.Commons.Helpers;
using ITJobs.UseCases.Interfaces.ExternalServices;
using ITJobs.UseCases.Interfaces.Repositories;
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

    public class RegisterAccountCommandHandler : IRequestHandler<RegisterAccountCommand, string>
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



        public async Task<string> Handle(RegisterAccountCommand request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "Handle(RegisterAccountCommand request, CancellationToken cancellationToken)", JsonConvert.SerializeObject(request));


                if (await _appUserRepository.IsEmailExistsAsync(request.Email))
                {
                    throw new EmailAlreadyExistsException();
                }

                await _unitOfWork.BeginTransactionAsync();
                var id = Guid.NewGuid();
                await _appUserRepository.RegisterAsync(id, Security.HashPassword(request.Password), request.Email, request.FullName, RoleType.Candidate);
                await _candidateRepository.AddAsync(id);
                await _unitOfWork.CommitAsync();

                await LoggerHelper.LogInfomationAsync(ipClient, "Handle(RegisterAccountCommand request, CancellationToken cancellationToken)", "đăng ký thành công: " + JsonConvert.SerializeObject(request));
                return "Đăng ký tài khoản thành công";
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
