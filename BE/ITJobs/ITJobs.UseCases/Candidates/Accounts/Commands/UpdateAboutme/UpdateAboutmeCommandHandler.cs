using ITJobs.Infrastructure.Commons.Helpers;
using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.UpdateAboutme
{
    public class UpdateAboutmeCommandHandler : IRequestHandler<UpdateAboutmeCommand, string>
    {
        private readonly ICandidateRepository _candidateRepository;
        private readonly IUnitOfWork _unitOfWork;
        public UpdateAboutmeCommandHandler(ICandidateRepository candidateRepository, IUnitOfWork unitOfWork)
        {
            _candidateRepository = candidateRepository;
            _unitOfWork = unitOfWork;
        }
        public async Task<string> Handle(UpdateAboutmeCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var content = Security.SanitizeHtmlContent(request.CandidateAboutme);
                await _unitOfWork.BeginTransactionAsync();
                await _candidateRepository.UpdateAboutmeAsync(request.UserId.Value, content);
                await _unitOfWork.CommitAsync();
                return Security.DeSanitizeHtmlContent(content);
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
