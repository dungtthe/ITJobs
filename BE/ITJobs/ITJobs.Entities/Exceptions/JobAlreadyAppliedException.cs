using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities.Exceptions
{
    public class JobAlreadyAppliedException : Exception
    {
        public JobAlreadyAppliedException(string message) : base(message)
        {
        }
        public JobAlreadyAppliedException() : base("Bạn đã nộp đơn ứng tuyển cho công việc này trước đó rồi.")
        {

        }
    }
}
