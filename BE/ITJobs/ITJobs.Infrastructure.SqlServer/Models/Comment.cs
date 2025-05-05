using ITJobs.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Models
{
    [Table("Comments")]
    public class Comment:BaseModel
    {
        public long PostId { get; set; }
        [ForeignKey(nameof(PostId))]
        public virtual Post Post { get; set; }

        [MaxLength(2000)]
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdateAt { get; set; }

        public long SenderId { get; set; }
        [ForeignKey(nameof(SenderId))]
        public virtual AppUser Sender { get; set; }

        public long? ParrentCommentId { get; set; }
        [ForeignKey(nameof(ParrentCommentId))]
        public virtual Comment ParrentComment { get; set; }
        public string ReactionType_UserId_Ids { get; set; }
        public bool IsRevoked { get; set; }
        public Comment()
        {
            ReactionType_UserId_Ids = "[]";
        }
    }
}
