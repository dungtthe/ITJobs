using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.DeleteCertification
{
    public class DeleteCertificationCommandHandler : IRequestHandler<DeleteCertificationCommand, Unit>
    {
        private readonly ICertificationRepository _certificationRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICandidateRepository _candidateRepository;

        public DeleteCertificationCommandHandler(ICertificationRepository certificationRepository, IUnitOfWork unitOfWork, ICandidateRepository candidateRepository)
        {
            _certificationRepository = certificationRepository;
            _unitOfWork = unitOfWork;
            _candidateRepository = candidateRepository;
        }

        public async Task<Unit> Handle(DeleteCertificationCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var candidateId = await _candidateRepository.GetCandidateIdByUserIdAsync(request.UserId.Value);

                if (!await _certificationRepository.IsCertificationOwnedByCandidateAsync(request.CertificationId, candidateId))
                {
                    throw new Entities.Exceptions.CertificationNotFoundException();
                }

                await _unitOfWork.BeginTransactionAsync();
                await _certificationRepository.DeleteCertificationAsync(request.CertificationId);
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
