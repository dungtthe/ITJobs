using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities
{
    public class WorkExperience:BaseEntity
    {
        public string JobTitle { get; set; }
        public string CompanyName { get; set; }
        public string WebsiteUrl { get; set; }//website cty
        public bool IsCurrent { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Description { get; set; }
    }
}
