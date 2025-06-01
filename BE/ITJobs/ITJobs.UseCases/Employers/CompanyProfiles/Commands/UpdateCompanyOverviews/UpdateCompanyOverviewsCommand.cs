using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.CompanyProfiles.Commands.UpdateCompanyOverviews
{
    public class UpdateCompanyOverviewsCommand : IRequest<Unit>
    {
        public Guid? UserId { get; set; }
        public string PhoneNumber { get; set; }
        public string CompanyName { get; set; }
        public string WebsiteUrl { get; set; }
        public string CompanyType { get; set; }
    }
}
