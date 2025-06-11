using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.UpdateOverviews
{
    public class UpdateOverviewsCommandHandler : IRequestHandler<UpdateOverviewsCommand, Unit>
    {
        private readonly ICandidateRepository _candidateRepository;
        private readonly IAppUserRepository _appUserRepository;
        private readonly IUnitOfWork _unitOfWork;
        public UpdateOverviewsCommandHandler(ICandidateRepository candidateRepository, IAppUserRepository appUserRepository, IUnitOfWork unitOfWork)
        {
            _candidateRepository = candidateRepository;
            _appUserRepository = appUserRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(UpdateOverviewsCommand request, CancellationToken cancellationToken)
        {
            try
            {

                if (!await _appUserRepository.UserExistsAsync(request.UserId.Value))
                {
                    throw new Entities.Exceptions.UserNotFoundException();
                }

                if (await _appUserRepository.UserExistByPhoneNumberAsync(request.PhoneNumber,request.UserId.Value))
                {
                    throw new Entities.Exceptions.PhoneNumberAlreadyExistsException();
                }

                await _unitOfWork.BeginTransactionAsync();
                await _candidateRepository.UpdateOverviewAsync(request.UserId.Value, request.FullName, request.PhoneNumber, request.Address, request.Gender, request.DateOfBirth, request.SocialMediaLinks);
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
