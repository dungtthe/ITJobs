using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.Services
{
    public interface IHttpContextInfoAccessor
    {
        string GetClientIpV4();
    }
}
