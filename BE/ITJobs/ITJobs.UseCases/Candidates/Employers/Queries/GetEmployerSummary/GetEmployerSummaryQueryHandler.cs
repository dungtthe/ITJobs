using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Employers.Queries.GetEmployerSummary
{
    public class GetEmployerSummaryQueryHandler : IRequestHandler<GetEmployerSummaryQuery, EmployerSummaryDto>
    {
        private readonly IEmployerRepository _employerRepository;
        public GetEmployerSummaryQueryHandler(IEmployerRepository employerRepository)
        {
            _employerRepository = employerRepository ?? throw new ArgumentNullException(nameof(employerRepository));
        }
        public async Task<EmployerSummaryDto> Handle(GetEmployerSummaryQuery request, CancellationToken cancellationToken)
        {
            return await _employerRepository.GetEmployerSummaryForCanddiateAsync(request.UserId);
        }
    }
}
