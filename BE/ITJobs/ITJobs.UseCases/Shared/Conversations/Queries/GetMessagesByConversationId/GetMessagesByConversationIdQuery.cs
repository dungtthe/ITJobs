using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.Conversations.Queries.GetMessagesByConversationId
{
    public class GetMessagesByConversationIdQuery : IRequest<List<MessageDto>>
    {
        public Guid ConversationId { get; set; }
        public Guid UserIdRequest { get; set; }
    }
}
