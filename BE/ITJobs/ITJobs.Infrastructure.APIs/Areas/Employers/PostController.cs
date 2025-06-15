using ITJobs.Infrastructure.APIs.MyExtensions;
using ITJobs.UseCases.Employers.Posts.Queries.GetJobPostsSummary;
using ITJobs.UseCases.Shared.Posts.Commands.CreateBlogPost;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

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


        [HttpGet("job")]
        public async Task<IActionResult> GetJobPostsSummarAsync([FromQuery] GetJobPostsSummaryQuery query)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "Vui lòng đăng nhập lại." });
            }
            query.UserId = userId.Value;
            var rs = await _mediator.Send(query);
            return Ok(rs);
        }

        [HttpPut("job/update")]
        public async Task<IActionResult> UpdateJobPostAsync([FromBody] ITJobs.UseCases.Employers.Posts.Commands.UpdateJobPost.UpdateJobPostCommand command)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "Vui lòng đăng nhập lại." });
            }
            command.UserId = userId.Value;
            await _mediator.Send(command);
            return Ok(new {});
        }

        [HttpGet("job/{postId}")]
        public async Task<IActionResult> GetJobPostByIdAsync([FromRoute] Guid postId)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "Vui lòng đăng nhập lại." });
            }
            var query = new ITJobs.UseCases.Employers.Posts.Queries.GetJobPostById.GetJobPostByIdQuery { PostId = postId, UserId = userId.Value };
            var rs = await _mediator.Send(query);
            return Ok(rs);
        }


        [HttpGet("job/job-application")]
        public async Task<IActionResult> GetJobApplicationsByPostIdAsync([FromQuery] UseCases.Employers.JobApplications.Queries.GetJobApplicationsByPostId.GetJobApplicationsByPostIdQuery query)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "Vui lòng đăng nhập lại." });
            }
            query.UserId = userId.Value;
            var rs = await _mediator.Send(query);
            return Ok(rs);
        }
    }
}
