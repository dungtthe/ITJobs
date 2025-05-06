using FluentValidation;
using ITJobs.Infrastructure.Commons.Consts;
using ITJobs.UseCases.Commons;
using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.Register
{

    public class RegisterAccountCommandHandler : IRequestHandler<RegisterAccountCommand, ResponeMessage>
    {
        private readonly IAppUserRepository _appUserRepository;
        private readonly ICandidateRepository _candidateRepository;
        private readonly IUnitOfWork _unitOfWork;
        public RegisterAccountCommandHandler(IAppUserRepository appUserRepository, ICandidateRepository candidateRepository, IUnitOfWork unitOfWork)
        {
            _appUserRepository = appUserRepository;
            _candidateRepository = candidateRepository;
            _unitOfWork = unitOfWork;
        }



        //test cqrs đã
        public async Task<ResponeMessage> Handle(RegisterAccountCommand request, CancellationToken cancellationToken)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();

                var userNew = await _appUserRepository.RegisterAsync(request.UserName, request.Password, request.Email, request.FullName);
                await _candidateRepository.AddAsync(userNew);

                await _unitOfWork.CommitAsync();

                return new ResponeMessage()
                {
                    HttpStatusCode = HttpStatusCode.Ok,
                    Message = "Đăng ký tài khoản thành công"
                };
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackAsync();
                return new ResponeMessage()
                {
                    HttpStatusCode = HttpStatusCode.InternalServerError,
                    Message = "Hệ thống đang xảy ra lỗi. Vui lòng thử lại"
                };
            }

        }
    }
}
