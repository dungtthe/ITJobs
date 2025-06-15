using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.Conversations.Queries.GetConversationsByUserId
{
    public class ConversationDto
    {
        public Guid Id { get; set; }
        public Guid OtherUserId { get; set; }
        public string OtherUserName { get; set; }
        public string OtherUserAvatar { get; set; }
        public string LastMessage { get; set; }
        public DateTime ?LastMessageTime { get; set; }//null la chua co tin nhan nao
        public int UnreadMessagesCount { get; set; }
    }
}
