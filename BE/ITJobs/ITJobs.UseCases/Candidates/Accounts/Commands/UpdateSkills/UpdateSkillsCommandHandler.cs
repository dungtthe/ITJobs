using ITJobs.Entities.Exceptions;
using ITJobs.Infrastructure.Commons.Helpers;
using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.UpdateSkills
{
    public class UpdateSkillsCommandHandler : IRequestHandler<UpdateCandidateSkillsCommand, Unit>
    {
        private readonly ICandidateRepository _candidateRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISearchFilterRepository _searchFilterRepository;

        public UpdateSkillsCommandHandler(ICandidateRepository candidateRepository, ISearchFilterRepository searchFilterRepository, IUnitOfWork unitOfWork)
        {
            _candidateRepository = candidateRepository;
            _unitOfWork = unitOfWork;
            _searchFilterRepository = searchFilterRepository;
        }
        public async Task<Unit> Handle(UpdateCandidateSkillsCommand request, CancellationToken cancellationToken)
        {

            try
            {

                await _unitOfWork.BeginTransactionAsync();
                await _candidateRepository.UpdateSkillAsync(request.UserId.Value, request.Skills);
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
