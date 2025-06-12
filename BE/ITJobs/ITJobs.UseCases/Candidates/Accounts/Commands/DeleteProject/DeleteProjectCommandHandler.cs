using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.DeleteProject
{
    public class DeleteProjectCommandHandler : IRequestHandler<DeleteProjectCommand, Unit>
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICandidateRepository _candidateRepository;

        public DeleteProjectCommandHandler(IProjectRepository projectRepository, IUnitOfWork unitOfWork, ICandidateRepository candidateRepository)
        {
            _projectRepository = projectRepository;
            _unitOfWork = unitOfWork;
            _candidateRepository = candidateRepository;
        }

        public async Task<Unit> Handle(DeleteProjectCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var candidateId = await _candidateRepository.GetCandidateIdByUserIdAsync(request.UserId.Value);
                if (!await _projectRepository.IsProjectOwnedByCandidateAsync(request.ProjectId, candidateId))
                {
                    throw new Entities.Exceptions.ProjectNotFoundException();
                }

                await _unitOfWork.BeginTransactionAsync();
                await _projectRepository.DeleteProjectAsync(request.ProjectId);
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
