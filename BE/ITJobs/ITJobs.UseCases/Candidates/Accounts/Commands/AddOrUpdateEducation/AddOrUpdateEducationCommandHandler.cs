using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateEducation
{
    public class AddOrUpdateEducationCommandHandler : IRequestHandler<AddOrUpdateEducationCommand, Guid>
    {
        private readonly ICandidateRepository _candidateRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IEducationRepository _educationRepository;
        public AddOrUpdateEducationCommandHandler(ICandidateRepository candidateRepository, IUnitOfWork unitOfWork, IEducationRepository educationRepository)
        {
            _candidateRepository = candidateRepository;
            _unitOfWork = unitOfWork;
            _educationRepository = educationRepository;
        }
        public async Task<Guid> Handle(AddOrUpdateEducationCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var candidateId = await _candidateRepository.GetCandidateIdByUserIdAsync(request.UserId.Value);

                await _unitOfWork.BeginTransactionAsync();
                var educationId = Guid.NewGuid();
                //add
                if (request.EducationId == null)
                {
                    request.EducationId = educationId;
                    await _educationRepository.AddAsync(candidateId,request);
                }
                else//update 
                {
                    if (!await _educationRepository.IsEducationOwnedByCandidateAsync(request.EducationId.Value,candidateId))
                    {
                        throw new Entities.Exceptions.EducationNotFoundException();
                    }
                    educationId = request.EducationId.Value;
                    await _educationRepository.UpdateAsync(request);
                }
                await _unitOfWork.CommitAsync();
                return educationId;
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
