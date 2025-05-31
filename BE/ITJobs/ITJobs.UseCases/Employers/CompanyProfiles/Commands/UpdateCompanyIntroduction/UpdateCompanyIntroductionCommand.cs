using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.CompanyProfiles.Commands.UpdateCompanyIntroduction
{
    public class UpdateCompanyIntroductionCommand:IRequest<string>
    {
        public Guid? UserId { get; set; }
        public string CompanyIntroduction { get; set; }
    }
}
