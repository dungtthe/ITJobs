using ITJobs.Entities.Enums;
using ITJobs.Entities.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities
{
    public class Reaction
    {
        //public AppUser AppUser { get; set; }
        public Guid UserId { get; set; }

        public ReactionType ReactionType { get; set; }
    }
}
