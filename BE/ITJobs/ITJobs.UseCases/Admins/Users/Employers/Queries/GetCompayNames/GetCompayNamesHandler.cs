using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.Users.Employers.Queries.GetCompayNames
{
    public class GetCompayNamesHandler : IRequestHandler<GetCompayNamesQuery, List<EmployerDto>>
    {
        private readonly IEmployerRepository _employerRepository;
        public GetCompayNamesHandler(IEmployerRepository employerRepository)
        {
            _employerRepository = employerRepository;
        }
        public async Task<List<EmployerDto>> Handle(GetCompayNamesQuery request, CancellationToken cancellationToken)
        {
            return await _employerRepository.GetCompayNamesForAdminAsync();
        }
    }
}
