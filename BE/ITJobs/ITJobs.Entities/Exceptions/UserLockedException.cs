using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities.Exceptions
{
    public class UserLockedException : Exception
    {
        public UserLockedException() : base("Tài khoản của bạn đang bị khóa nên không thể truy cập.")
        {
        }

        public UserLockedException(string message) : base(message)
        {
        }

    }
}
