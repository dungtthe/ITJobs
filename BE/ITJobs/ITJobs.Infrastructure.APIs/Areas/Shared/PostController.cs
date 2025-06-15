using ITJobs.Infrastructure.APIs.MyExtensions;
using ITJobs.UseCases.Admins.Posts.Queries.GetBlogPostsSummary;
using ITJobs.UseCases.Shared.Posts.Commands.CreateBlogPost;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Shared
{
    [Route("api/post")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IMediator _mediator;
        public PostController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize]
        [HttpPost("blog/add")]
        public async Task<IActionResult> AddBlogPostAsync([FromBody] CreateBlogPostCommand command)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "Vui lòng đăng nhập lại." });
            }
            command.UserId = userId.Value;

            var rs = await _mediator.Send(command);
            return Ok(new { id = rs });
        }

        [HttpGet("comment/{postId}")]
        public async Task<IActionResult> GetCommentAsync([FromRoute] UseCases.Shared.Posts.Queries.GetCommentsByPostId.GetCommentsByPostIdQuery query)
        {
           return Ok(await _mediator.Send(query));
        }
    }
}
