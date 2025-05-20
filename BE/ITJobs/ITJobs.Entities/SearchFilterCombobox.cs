using ITJobs.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities
{
    public class SearchFilterCombobox:SearchFilter
    {
        public List<string> Values { get; set; }

        public SearchFilterCombobox()
        {
            SearchFilterType = Enums.SearchFilterType.Combobox;
        }
    }
}
