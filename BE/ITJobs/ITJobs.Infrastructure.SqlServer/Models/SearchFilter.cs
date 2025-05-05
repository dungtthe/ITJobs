using ITJobs.Entities.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Models
{
    [Table("SearchFilters")]
    public class SearchFilter:BaseModel
    {
        [Required]
        [MaxLength(500)]
        public string Name { get; set; }
        public SearchFilterType SearchFilterType { get; set; }
        public string Values { get; set; }
    }
}
