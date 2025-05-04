using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities
{
    public class Conversation
    {
        public AppUser User1 { get; set; }
        public AppUser User2 { get; set; }
        public List<Message> Messages { get; set; }
    }
}
