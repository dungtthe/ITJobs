using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities.Exceptions
{
    public class InvalidPostException
    {
        public class NonJobPostException : Exception
        {
        }
        public class InvalidJobPostingException : Exception
        {
        }
        public class InvalidViewCountException : Exception
        {
        }
        public class InvalidPostingFeeException:Exception
        {
            
        }
    }
}
