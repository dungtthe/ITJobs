using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.Conversations.Queries.GetMessagesByConversationId
{
    public class MessageDto
    {
        public Guid Id { get; set; }
        public Guid ConversationId { get;set; }
        
        public Guid SenderId { get; set; }
        public string SenderFullName { get; set; }
        public string SenderImage { get; set; }

        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public Entities.Enums.ReactionType? ReactionType { get; set; }
        public bool IsOtherSender { get; set; }
        public string ParentMessageContent { get; set; }
    }
}
