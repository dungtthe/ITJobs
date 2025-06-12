using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateAward
{
    public class AddOrUpdateAwardCommandHandler : IRequestHandler<AddOrUpdateAwardCommand, Guid>
    {
        private readonly ICandidateRepository _candidateRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAwardRepository _awardRepository;

        public AddOrUpdateAwardCommandHandler(
            ICandidateRepository candidateRepository,
            IUnitOfWork unitOfWork,
            IAwardRepository awardRepository)
        {
            _candidateRepository = candidateRepository;
            _unitOfWork = unitOfWork;
            _awardRepository = awardRepository;
        }

        public async Task<Guid> Handle(AddOrUpdateAwardCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var candidateId = await _candidateRepository.GetCandidateIdByUserIdAsync(request.UserId.Value);

                await _unitOfWork.BeginTransactionAsync();
                var awardId = Guid.NewGuid();

                // Add
                if (request.AwardId == null)
                {
                    request.AwardId = awardId;
                    await _awardRepository.AddAsync(candidateId, request);
                }
                else // Update
                {
                    if (!await _awardRepository.IsAwardOwnedByCandidateAsync(request.AwardId.Value, candidateId))
                    {
                        throw new Entities.Exceptions.AwardNotFoundException();
                    }
                    awardId = request.AwardId.Value;
                    await _awardRepository.UpdateAsync(request);
                }

                await _unitOfWork.CommitAsync();
                return awardId;
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
