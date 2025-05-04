using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities
{
    public class Comment:BaseEntity
    {
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public AppUser Sender { get; set; }
        public Comment ParrentComment { get; set; }
        public bool IsRevoked { get; set; }
        public List<Reaction> Reactions { get; set; }
    }
}
