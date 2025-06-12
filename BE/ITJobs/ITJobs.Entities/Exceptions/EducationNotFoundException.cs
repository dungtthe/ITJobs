using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities.Exceptions
{
    public class EducationNotFoundException : Exception
    {
        public EducationNotFoundException() : base("Không tìm thấy thông tin học vấn.") { }
        public EducationNotFoundException(string message) : base(message)
        {
        }
    }
}
