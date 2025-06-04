using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities.Exceptions
{
    public class ForbiddenAccessException:Exception
    {
        public ForbiddenAccessException(string message = "Bạn không được phép thực hiện chức năng này") : base(message)
        {
        }
    }
}
