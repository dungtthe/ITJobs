using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities.Exceptions
{
    public class EmailAlreadyExistsException:Exception
    {
        public EmailAlreadyExistsException() : base("Email đã có người sử dụng.")
        {
        }
        public EmailAlreadyExistsException(string message) : base(message)
        {
        }
       
    }
}
