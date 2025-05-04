using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities
{
    public class Award
    {
        public string Name { get; set; }
        public string Organization { get; set; }
        public DateTime ReceivedDate { get; set; }
        public string Description { get; set; }
        public string WebsiteUrl { get; set; }//website noi cap giai thuong

    }
}
