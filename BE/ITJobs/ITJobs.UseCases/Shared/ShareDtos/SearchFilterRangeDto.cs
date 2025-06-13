using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.ShareDtos
{
    public class SearchFilterRangeDto
    {
        public Guid SearchFilterId { get; set; }
        public string Min { get; set; }
        public string Max { get; set; }
    }
}
