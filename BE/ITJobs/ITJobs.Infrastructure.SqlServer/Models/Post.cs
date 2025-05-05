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
    [Table("Posts")]
    public class Post : BaseModel
    {
        public long UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual AppUser User { get; set; }

        [Required]
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public PostType PostType { get; set; }
        public string ReactionType_UserId_Ids { get; set; }
        public bool IsDeleted { get; set; }
        public string Keywords { get; set; }
        public long ViewCount { get; set; }

        public DateTime?EndDate { get; set; }
        public long ?PostingFee { get; set; }
        public Post()
        {
            ReactionType_UserId_Ids = "[]";
            Keywords = "[]";
            CreatedAt = DateTime.Now;
        }
    }
}
