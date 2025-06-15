using ITJobs.Infrastructure.APIs.MyExtensions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Shared
{
    [Route("api/conversation")]
    [ApiController]
    [Authorize]
    public class ConversationController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ConversationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetConversationsByUserIdAsync()
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "Vui lòng đăng nhập lại." });
            }
            var query = new UseCases.Shared.Conversations.Queries.GetConversationsByUserId.GetConversationByUserIdQuery
            {
                UserId = userId.Value
            };
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetConversationByIdAsync([FromRoute] Guid id)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "Vui lòng đăng nhập lại." });
            }
            var query = new UseCases.Shared.Conversations.Queries.GetMessagesByConversationId.GetMessagesByConversationIdQuery
            {
                ConversationId = id,
                UserIdRequest = userId.Value
            };
            var result = await _mediator.Send(query);
            return Ok(result);
        }
    }
}
