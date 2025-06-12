using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.DeleteAward
{
    public class DeleteAwardCommandHandler : IRequestHandler<DeleteAwardCommand, Unit>
    {
        private readonly IAwardRepository _awardRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICandidateRepository _candidateRepository;

        public DeleteAwardCommandHandler(
            IAwardRepository awardRepository,
            IUnitOfWork unitOfWork,
            ICandidateRepository candidateRepository)
        {
            _awardRepository = awardRepository;
            _unitOfWork = unitOfWork;
            _candidateRepository = candidateRepository;
        }

        public async Task<Unit> Handle(DeleteAwardCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var candidateId = await _candidateRepository.GetCandidateIdByUserIdAsync(request.UserId.Value);

                if (!await _awardRepository.IsAwardOwnedByCandidateAsync(request.AwardId, candidateId))
                {
                    throw new Entities.Exceptions.AwardNotFoundException();
                }

                await _unitOfWork.BeginTransactionAsync();
                await _awardRepository.DeleteAwardAsync(request.AwardId);
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
