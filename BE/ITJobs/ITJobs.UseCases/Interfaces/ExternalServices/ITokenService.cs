using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.ExternalServices
{
    public interface ITokenService
    {
        string GenerateJwtToken(Entities.AppUser user);
    }
}
