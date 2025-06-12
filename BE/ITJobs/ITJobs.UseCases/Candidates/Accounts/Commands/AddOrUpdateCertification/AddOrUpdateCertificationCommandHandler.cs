using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateCertification
{
    public class AddOrUpdateCertificationCommandHandler : IRequestHandler<AddOrUpdateCertificationCommand, Guid>
    {
        private readonly ICandidateRepository _candidateRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICertificationRepository _certificationRepository;

        public AddOrUpdateCertificationCommandHandler(ICandidateRepository candidateRepository, IUnitOfWork unitOfWork, ICertificationRepository certificationRepository)
        {
            _candidateRepository = candidateRepository;
            _unitOfWork = unitOfWork;
            _certificationRepository = certificationRepository;
        }

        public async Task<Guid> Handle(AddOrUpdateCertificationCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var candidateId = await _candidateRepository.GetCandidateIdByUserIdAsync(request.UserId.Value);
                await _unitOfWork.BeginTransactionAsync();
                var certificationId = Guid.NewGuid();

                //add
                if (request.CertificationId == null)
                {
                    request.CertificationId = certificationId;
                    await _certificationRepository.AddAsync(candidateId, request);
                }
                else//update
                {
                    if (!await _certificationRepository.IsCertificationOwnedByCandidateAsync(request.CertificationId.Value, candidateId))
                    {
                        throw new Entities.Exceptions.CertificationNotFoundException();
                    }
                    certificationId = request.CertificationId.Value;
                    await _certificationRepository.UpdateAsync(request);
                }

                await _unitOfWork.CommitAsync();
                return certificationId;
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
