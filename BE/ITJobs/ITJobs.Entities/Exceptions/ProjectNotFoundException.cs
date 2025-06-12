using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities.Exceptions
{
    public class ProjectNotFoundException : Exception
    {
        public ProjectNotFoundException() : base("Dự án không tồn tại.")
        {
        }

        public ProjectNotFoundException(string message) : base(message)
        {
        }
    }
}
