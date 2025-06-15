using ITJobs.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities
{
    public class JobApplication:BaseEntity
    {
        public AppUser Candidate { get; set; }
        public string CVLink { get; set; }
        public string CoverLetter { get; set; }
        public StatusJobApplication StatusJobApplication { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
