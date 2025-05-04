using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities
{
    public class Certification:BaseEntity
    {
        public string Name { get; set; }
        public DateTime ReceivedDate { get; set; }
        public string Image { get; set; }
        public string WebsiteUrl { get; set; }//noi cap chung chi
        public string Description { get; set; }
    }
}
