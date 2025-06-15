using ITJobs.UseCases.Shared.Conversations.Queries.GetConversationsByUserId;
using ITJobs.UseCases.Shared.Conversations.Queries.GetMessagesByConversationId;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.Repositories
{
    public interface IConversationRepository
    {
        Task<List<ConversationDto>> GetConversationsByUserIdAsync(Guid userId);
        Task<List<MessageDto>> GetMessagesByConverSationIdAsync(GetMessagesByConversationIdQuery query);
        Task<bool> IsConversationOwnedByUserAsync(Guid conversationId, Guid userId);
    }
}
