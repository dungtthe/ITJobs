using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateProject
{
    public class AddOrUpdateProjectCommandHandler : IRequestHandler<AddOrUpdateProjectCommand, Guid>
    {
        private readonly ICandidateRepository _candidateRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IProjectRepository _projectRepository;

        public AddOrUpdateProjectCommandHandler(ICandidateRepository candidateRepository, IUnitOfWork unitOfWork, IProjectRepository projectRepository)
        {
            _candidateRepository = candidateRepository;
            _unitOfWork = unitOfWork;
            _projectRepository = projectRepository;
        }

        public async Task<Guid> Handle(AddOrUpdateProjectCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var candidateId = await _candidateRepository.GetCandidateIdByUserIdAsync(request.UserId.Value);

                await _unitOfWork.BeginTransactionAsync();
                var projectId = Guid.NewGuid();

                // Add
                if (request.ProjectId == null)
                {
                    request.ProjectId = projectId;
                    await _projectRepository.AddAsync(candidateId, request);
                }
                else // Update
                {
                    if (!await _projectRepository.IsProjectOwnedByCandidateAsync(request.ProjectId.Value, candidateId))
                    {
                        throw new Entities.Exceptions.ProjectNotFoundException();
                    }
                    projectId = request.ProjectId.Value;
                    await _projectRepository.UpdateAsync(request);
                }

                await _unitOfWork.CommitAsync();
                return projectId;
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
