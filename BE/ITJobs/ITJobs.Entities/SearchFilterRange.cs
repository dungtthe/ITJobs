using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities
{
    public class SearchFilterRange:SearchFilter
    {
        public long Min { get; set; }
        public long Max { get; set; }
    }
}
