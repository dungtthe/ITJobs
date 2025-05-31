using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.CompanyProfiles.Queries.GetCompanyProfile
{
    public class GetCompanyProfileQuery:IRequest<CompanyProfileDto>
    {
        public Guid ?UserId { get; set; }
    }
}
