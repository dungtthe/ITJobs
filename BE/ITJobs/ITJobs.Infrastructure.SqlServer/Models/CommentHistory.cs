using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Models
{
    [Table("CommentHistories")]
    public class CommentHistory:BaseModel
    {
        public long CommentId { get; set; }
        [ForeignKey(nameof(CommentId))]
        public virtual Comment Comment { get; set; }

        [MaxLength(2000)]
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
