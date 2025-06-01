using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.CompanyProfiles.Commands.UpdateLocations
{
    public class UpdateLocationsCommand:IRequest<Unit>
    {
        public Guid? UserId { get; set; }
        public List<Entities.Location> Locations { get; set; }
    }
}
