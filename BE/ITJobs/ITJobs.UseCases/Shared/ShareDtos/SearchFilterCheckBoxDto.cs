using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.ShareDtos
{
    public class SearchFilterCheckBoxDto
    {
        public Guid SearchFilterId { get; set; }
        public List<string> Values { get; set; }
    }
}
