using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.UploadCVs
{
    public class UploadCVsCommandHandler : IRequestHandler<UploadCVsCommand, List<Entities.CV>>
    {
        private readonly ICVRepository _cvRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICandidateRepository _candidateRepository;

        public UploadCVsCommandHandler(ICVRepository cvRepository, IUnitOfWork unitOfWork, ICandidateRepository candidateRepository)
        {
            _cvRepository = cvRepository;
            _unitOfWork = unitOfWork;
            _candidateRepository = candidateRepository;
        }
        public async Task<List<Entities.CV>> Handle(UploadCVsCommand request, CancellationToken cancellationToken)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();

                var candidateId = await _candidateRepository.GetCandidateIdByUserIdAsync(request.UserId.Value);

                foreach (var cv in request.CVs)
                {
                    cv.Id = Guid.NewGuid();
                    cv.CandidateId = candidateId;
                }

                await _cvRepository.UploadCVsAsync(request.UserId.Value, request.CVs);
                await _unitOfWork.CommitAsync();
                return request.CVs;
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
