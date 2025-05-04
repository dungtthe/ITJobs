using ITJobs.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities
{
    public class SearchFilter:BaseEntity
    {
        public string Name { get; set; }
        public SearchFilterType SearchFilterType { get; set; }
    }
}
