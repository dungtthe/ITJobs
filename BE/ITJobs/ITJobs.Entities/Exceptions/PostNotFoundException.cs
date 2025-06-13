using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities.Exceptions
{
    public class PostNotFoundException:Exception
    {
        public PostNotFoundException() : base("Không tìm thấy bài đăng.")
        {
        }
        public PostNotFoundException(string message) : base(message)
        {
        }
    }
}
