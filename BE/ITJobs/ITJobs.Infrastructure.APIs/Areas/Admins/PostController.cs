using ITJobs.Infrastructure.APIs.MyExtensions;
using ITJobs.UseCases.Admins.Posts.Commands.CreateBlogPost;
using ITJobs.UseCases.Admins.Posts.Queries.GetPosts.GetBlogPosts.GetBlogPostsSummary;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Admins
{
    [Area("Admin")]
    [Route("api/admin/post")]
    [ApiController]
    [Authorize]
    public class PostController : ControllerBase
    {
        private readonly IMediator _mediator;
        public PostController(IMediator mediator)
        {
            _mediator = mediator;
        }

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

        [HttpGet("blog")]
        public async Task<IActionResult> GetBlogPostsSummarAsync([FromQuery] GetBlogPostsSummaryQuery query)
        {
            var rs = await _mediator.Send(query);
            return Ok(rs);
        }
    }
}
