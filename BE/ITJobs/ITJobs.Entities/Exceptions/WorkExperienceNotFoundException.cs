using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities.Exceptions
{
    public class WorkExperienceNotFoundException: Exception
    {
        public WorkExperienceNotFoundException() : base("Không tìm thấy kinh nghiệm làm việc.")
        {
        }

        public WorkExperienceNotFoundException(string message) : base(message)
        {
        }
    }
}
