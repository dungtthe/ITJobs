using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Models
{
    [Table("CVTemplates")]
    public class CVTemplate:BaseModel
    {
        public Guid UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual AppUser User { get; set; }

        public string Content { get; set; }
        public int SortOrder { get; set; }
    }
}
