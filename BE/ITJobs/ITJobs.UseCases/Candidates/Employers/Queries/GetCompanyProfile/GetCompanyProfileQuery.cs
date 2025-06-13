using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Employers.Queries.GetCompanyProfile
{
    public class GetCompanyProfileQuery : IRequest<CompanyProfileDto>
    {
        public Guid UserId { get; set; } // id user cua employer
    }
}
