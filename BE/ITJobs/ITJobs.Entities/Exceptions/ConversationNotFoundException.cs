using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities.Exceptions
{
    public class ConversationNotFoundException:Exception
    {
        public ConversationNotFoundException() : base("Không tìm thấy cuộc trò chuyện này.")
        {

        }

        public ConversationNotFoundException(string message) : base(message)
        {

        }   
    }
}
