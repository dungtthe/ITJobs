using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.DeleteEducation
{
    public class DeleteEducationCommandHandler : IRequestHandler<DeleteEducationCommand, Unit>
    {
        private readonly IEducationRepository _educationRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICandidateRepository _candidateRepository;
        public DeleteEducationCommandHandler(IEducationRepository educationRepository, IUnitOfWork unitOfWork, ICandidateRepository candidateRepository)
        {
            _educationRepository = educationRepository;
            _unitOfWork = unitOfWork;
            _candidateRepository = candidateRepository;
        }
        public async Task<Unit> Handle(DeleteEducationCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var candidateId = await _candidateRepository.GetCandidateIdByUserIdAsync(request.UserId.Value);
                if (!await _educationRepository.IsEducationOwnedByCandidateAsync(request.EducationId, candidateId))
                {
                    throw new Entities.Exceptions.EducationNotFoundException();
                }
                await _unitOfWork.BeginTransactionAsync();
                await _educationRepository.DeleteEducationAsync(request.EducationId);
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
