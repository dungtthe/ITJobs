using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.Candidates.Queries.GetCandidateProfile
{
    public class GetCandidateProfileQueryHandler : IRequestHandler<GetCandidateProfileQuery, CandidateProfileDto>
    {
        private readonly ICandidateRepository _candidateRepository;
        private readonly IAppUserRepository _appUserRepository;
        public GetCandidateProfileQueryHandler(ICandidateRepository candidateRepository, IAppUserRepository appUserRepository)
        {
            _candidateRepository = candidateRepository;
            _appUserRepository = appUserRepository;
        }

        public async Task<CandidateProfileDto> Handle(GetCandidateProfileQuery request, CancellationToken cancellationToken)
        {
            if (!await _appUserRepository.UserExistsAsync(request.UserId.Value))
            {
                throw new Entities.Exceptions.UserNotFoundException();
            }

            return await _candidateRepository.GetCandidateProfileAsync(request.UserId.Value);
        }
    }
}
