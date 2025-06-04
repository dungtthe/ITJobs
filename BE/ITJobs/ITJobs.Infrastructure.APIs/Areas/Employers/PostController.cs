using ITJobs.Infrastructure.APIs.MyExtensions;
using ITJobs.UseCases.Shared.Posts.Commands.CreateBlogPost;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Employers
{
    [Area("Employer")]
    [Route("api/employer/post")]
    [ApiController]
    [Authorize]
    public class PostController : ControllerBase
    {
        private readonly IMediator _mediator;
        public PostController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("job/add")]
        public async Task<IActionResult> AddJobPostAsync([FromBody] ITJobs.UseCases.Employers.Posts.Commands.AddJobPost.AddJobPostCommand command)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "Vui lòng đăng nhập lại." });
            }
            command.UserId = userId.Value;
            var rs = await _mediator.Send(command);
            return Ok(rs);
        }
    }
}
