using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.CompanyProfiles.Commands.UpdateGeneralInfos
{
    public class UpdateGeneralInfosCommand:IRequest<List<Entities.GeneralInfoItem>>
    {
        public Guid ?UserId { get; set; }
        public List<Entities.GeneralInfoItem> GeneralInfos { get; set; }
    }
}
