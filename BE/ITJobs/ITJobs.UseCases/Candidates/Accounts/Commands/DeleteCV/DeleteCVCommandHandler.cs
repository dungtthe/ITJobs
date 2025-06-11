using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.DeleteCV
{
    public class DeleteCVCommandHandler : IRequestHandler<DeleteCVCommand, string>
    {
        private readonly ICVRepository _cvRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICandidateRepository _candidateRepository;
        public DeleteCVCommandHandler(ICVRepository cvRepository, IUnitOfWork unitOfWork, ICandidateRepository candidateRepository)
        {
            _cvRepository = cvRepository;
            _unitOfWork = unitOfWork;
            _candidateRepository = candidateRepository;
        }

        public async Task<string> Handle(DeleteCVCommand request, CancellationToken cancellationToken)
        {

            try
            {
                var candidateId = await _candidateRepository.GetCandidateIdByUserIdAsync(request.UserId.Value);
                var fCV = await _cvRepository.GetCVByIdAsync(request.CVId);
                await _unitOfWork.BeginTransactionAsync();
                await _cvRepository.DeleteCVByIdAsync(candidateId,request.CVId);
                await _unitOfWork.CommitAsync();
                return fCV.FileName;
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
