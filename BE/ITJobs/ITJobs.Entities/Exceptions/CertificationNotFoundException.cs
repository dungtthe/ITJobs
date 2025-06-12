using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities.Exceptions
{
    public class CertificationNotFoundException : Exception
    {
        public CertificationNotFoundException() : base("Chứng chỉ không tồn tại.")
        {
        }

        public CertificationNotFoundException(string message) : base(message)
        {
        }
    }
}
