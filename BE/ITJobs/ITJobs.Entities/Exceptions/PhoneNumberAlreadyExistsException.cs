using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities.Exceptions
{
    public class PhoneNumberAlreadyExistsException:Exception
    {
        public PhoneNumberAlreadyExistsException(string message) : base(message)
        {
        }
        public PhoneNumberAlreadyExistsException() : base("Số điện thoại đã có trong hệ thống")
        {
        }
    }
}
