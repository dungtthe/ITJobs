using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.DeleteWorkExperience
{
    public class DeleteWorkExperienceCommandHandler : IRequestHandler<DeleteWorkExperienceCommand, Unit>
    {
        private readonly IWorkExperienceRepository _workExperienceRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICandidateRepository _candidateRepository;

        public DeleteWorkExperienceCommandHandler(IWorkExperienceRepository workExperienceRepository, IUnitOfWork unitOfWork, ICandidateRepository candidateRepository)
        {
            _workExperienceRepository = workExperienceRepository;
            _unitOfWork = unitOfWork;
            _candidateRepository = candidateRepository;
        }

        public async Task<Unit> Handle(DeleteWorkExperienceCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var candidateId = await _candidateRepository.GetCandidateIdByUserIdAsync(request.UserId.Value);
                if (!await _workExperienceRepository.IsWorkExperienceOwnedByCandidateAsync(request.WorkExperienceId, candidateId))
                {
                    throw new Entities.Exceptions.WorkExperienceNotFoundException();
                }
                await _unitOfWork.BeginTransactionAsync();
                await _workExperienceRepository.DeleteWorkExperienceAsync(request.WorkExperienceId);
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
