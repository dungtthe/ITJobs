using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateWorkExperience
{
    public class AddOrUpdateWorkExperienceCommandHandler : IRequestHandler<AddOrUpdateWorkExperienceCommand, Guid>
    {
        private readonly ICandidateRepository _candidateRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWorkExperienceRepository _workExperienceRepository;

        public AddOrUpdateWorkExperienceCommandHandler(ICandidateRepository candidateRepository, IUnitOfWork unitOfWork, IWorkExperienceRepository workExperienceRepository)
        {
            _candidateRepository = candidateRepository;
            _unitOfWork = unitOfWork;
            _workExperienceRepository = workExperienceRepository;
        }

        public async Task<Guid> Handle(AddOrUpdateWorkExperienceCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var candidateId = await _candidateRepository.GetCandidateIdByUserIdAsync(request.UserId.Value);
                await _unitOfWork.BeginTransactionAsync();
                var workExperienceId = Guid.NewGuid();

                //add
                if (request.WorkExperienceId == null)
                {
                    request.WorkExperienceId = workExperienceId;
                    await _workExperienceRepository.AddAsync(candidateId, request);
                }
                //update
                else
                {
                    workExperienceId = request.WorkExperienceId.Value;
                    if (!await _workExperienceRepository.IsWorkExperienceOwnedByCandidateAsync(request.WorkExperienceId.Value, candidateId))
                    {
                        throw new Entities.Exceptions.WorkExperienceNotFoundException();
                    }
                    await _workExperienceRepository.UpdateAsync(request);
                }
                await _unitOfWork.CommitAsync();
                return workExperienceId;
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
