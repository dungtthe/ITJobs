using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities
{
    public class Project : BaseEntity
    {
        public string Name { get; set; }
        public bool IsOnGoing { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Description { get; set; }
        public List<SocialMedia> SocialMediaLinks { get; set; }
    }
}
