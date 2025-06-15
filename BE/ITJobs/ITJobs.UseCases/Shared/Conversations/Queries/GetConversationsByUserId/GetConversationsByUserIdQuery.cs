using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.Conversations.Queries.GetConversationsByUserId
{
    public class GetConversationByUserIdQuery:IRequest<List<ConversationDto>>
    {
        public Guid UserId { get; set; }
    }
}
