using ITJobs.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities
{
    public class Message:BaseEntity
    {
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public AppUser Sender { get; set; }
        public Message ParrentMessage { get; set; }
        public ReactionType ReactionType { get; set; }
        public bool IsRevoked { get; set; }
        public bool IsRead { get; set; }
    }
}
