using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Shared.Conversations.Queries.GetConversationsByUserId;
using ITJobs.UseCases.Shared.Conversations.Queries.GetMessagesByConversationId;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Repositories
{
    public class ConversationRepository : IConversationRepository
    {
        private readonly ITJobsDbContext _dbContext;
        public ConversationRepository(ITJobsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<ConversationDto>> GetConversationsByUserIdAsync(Guid userId)
        {
            var conversations = await _dbContext.Conversations.Where(c=>c.UserId1==userId || c.UserId2==userId)
                .Select(c => new ConversationDto
                {
                    Id = c.Id,
                    OtherUserId = c.UserId1 == userId ? c.UserId2 : c.UserId1,
                    OtherUserName = c.UserId1==userId ? c.User2.FullName : c.User1.FullName,
                    OtherUserAvatar = c.UserId1==userId ? c.User2.Image : c.User1.Image
                })
                .ToListAsync();

            foreach (var conversation in conversations)
            {
                var lastMessage = await _dbContext.Messages
                    .Where(m => m.ConversationId == conversation.Id)
                    .OrderByDescending(m => m.CreatedAt)
                    .FirstOrDefaultAsync();
                if (lastMessage != null)
                {
                    conversation.LastMessage = lastMessage.Content;
                    if(lastMessage.SenderId == userId)
                    {
                        conversation.LastMessage = "Bạn: " + conversation.LastMessage;
                    }
                    if(lastMessage.IsRevoked)
                    {
                        conversation.LastMessage = "Tin nhắn này đã bị thu hồi";
                    }
                    conversation.LastMessageTime = lastMessage.CreatedAt;
                }
                else
                {
                    conversation.LastMessage = "Cùng nhau bắt đầu cuộc trò chuyện nào!";
                }
                conversation.UnreadMessagesCount = await _dbContext.Messages
                    .Where(m => m.ConversationId == conversation.Id && m.SenderId == conversation.OtherUserId && !m.IsRead)
                    .CountAsync();

            }
            return conversations.OrderByDescending(c => c.LastMessageTime).ToList();
        }

        public async Task<List<MessageDto>> GetMessagesByConverSationIdAsync(GetMessagesByConversationIdQuery query)
        {
            var messages = await _dbContext.Messages
                .Where(m => m.ConversationId == query.ConversationId)
                .OrderByDescending(m => m.CreatedAt)
                .Select(m => new MessageDto
                {
                    Id = m.Id,
                    ConversationId = m.ConversationId,
                    SenderId = m.SenderId,
                    SenderFullName = m.Sender.FullName,
                    SenderImage = m.Sender.Image,
                    Content = m.IsRevoked ? "Tin nhắn này đã bị thu hồi" : m.Content,
                    CreatedAt = m.CreatedAt,
                    ReactionType = m.ReactionType,
                    IsOtherSender = m.SenderId!= query.UserIdRequest,
                    ParentMessageContent = m.ParrentMessageId==null?null:m.ParrentMessage.Content
                })
                .ToListAsync();
            return messages;
        }

        public async Task<bool> IsConversationOwnedByUserAsync(Guid conversationId, Guid userId)
        {
            return await _dbContext.Conversations.AnyAsync(c => c.Id == conversationId && (c.UserId1 == userId || c.UserId2 == userId));
        }
    }
}
