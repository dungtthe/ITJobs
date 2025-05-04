using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities
{
    public class CVTemplate:BaseEntity
    {
        public AppUser AppUser { get; set; }
        public string Content { get; set; }
        public int SortOrder { get; set; }
    }
}
