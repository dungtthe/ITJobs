using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Models
{
    [Table("SearchFilter_Post")]
    public class SearchFilter_Post
    {
        public long SearchFilterId { get; set; }
        [ForeignKey(nameof(SearchFilterId))]
        public virtual SearchFilter SearchFilter { get; set; }
        public long PostId { get; set; }
        [ForeignKey(nameof(PostId))]
        public virtual Post Post { get; set; }
        public string Values { get; set; }
    }
}
