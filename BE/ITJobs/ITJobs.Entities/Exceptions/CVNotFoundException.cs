using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities.Exceptions
{
    public class CVNotFoundException : Exception
    {
        public CVNotFoundException() : base("Không tìm thấy CV.") { }
        public CVNotFoundException(string message) : base(message) { }
    }
}
