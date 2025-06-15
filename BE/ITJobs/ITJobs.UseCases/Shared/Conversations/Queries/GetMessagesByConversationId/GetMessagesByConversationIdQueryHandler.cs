using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.Conversations.Queries.GetMessagesByConversationId
{
    public class GetMessagesByConverSationIdQueryHandler : IRequestHandler<GetMessagesByConversationIdQuery, List<MessageDto>>
    {
        private readonly IConversationRepository _conversationRepository;
        public GetMessagesByConverSationIdQueryHandler(IConversationRepository conversationRepository)
        {
            _conversationRepository = conversationRepository;
        }
        public async Task<List<MessageDto>> Handle(GetMessagesByConversationIdQuery request, CancellationToken cancellationToken)
        {

            if(!await _conversationRepository.IsConversationOwnedByUserAsync(request.ConversationId,request.UserIdRequest))
            {
                throw new Entities.Exceptions.ConversationNotFoundException();
            }
            return await _conversationRepository.GetMessagesByConverSationIdAsync(request);
        }
    }
}
