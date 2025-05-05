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
    [Table("Messages")]
    public class Message:BaseModel
    {
        public long ConversationId { get; set; }
        [ForeignKey(nameof(ConversationId))]
        public virtual Conversation Conversation { get; set; }

        public long SenderId { get; set; }
        [ForeignKey(nameof(SenderId))]
        public virtual AppUser Sender { get; set; }

        [MaxLength(2000)]
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }

        public long? ParrentMessageId { get; set; }
        [ForeignKey(nameof(ParrentMessageId))]
        public virtual Message ParrentMessage { get; set; }

        public ReactionType ReactionType { get; set; }
        public bool IsRevoked { get; set; }
        public bool IsRead { get; set; }

        public Message()
        {
            ReactionType = ReactionType.None;
            CreatedAt = DateTime.Now;
        }
    }
}
