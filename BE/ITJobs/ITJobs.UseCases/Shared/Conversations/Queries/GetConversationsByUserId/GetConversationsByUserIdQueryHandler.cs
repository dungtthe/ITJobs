using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.Conversations.Queries.GetConversationsByUserId
{
    public class GetConversationsByUserIdQueryHandler : IRequestHandler<GetConversationByUserIdQuery, List<ConversationDto>>
    {
        private readonly IConversationRepository _conversationRepository;
        public GetConversationsByUserIdQueryHandler(IConversationRepository conversationRepository)
        {
            _conversationRepository = conversationRepository;
        }
        public Task<List<ConversationDto>> Handle(GetConversationByUserIdQuery request, CancellationToken cancellationToken)
        {
            return _conversationRepository.GetConversationsByUserIdAsync(request.UserId);
        }
    }
}
