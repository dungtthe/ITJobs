using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Models
{
    [Table("PostHistories")]
    public class PostHistory:BaseModel
    {
        public long PostId { get; set; }
        [ForeignKey(nameof(PostId))]
        public virtual Post Post { get; set; }

        [Required]
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
