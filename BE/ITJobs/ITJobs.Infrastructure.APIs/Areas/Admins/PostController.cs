using ITJobs.Infrastructure.APIs.MyExtensions;
using ITJobs.UseCases.Admins.Posts.Queries.GetBlogPostsSummary;
using ITJobs.UseCases.Admins.Posts.Queries.GetJobPostsSummary;
using ITJobs.UseCases.Shared.Posts.Commands.CreateBlogPost;
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

        [HttpGet("blog")]
        public async Task<IActionResult> GetBlogPostsSummarAsync([FromQuery] GetBlogPostsSummaryQuery query)
        {
            var rs = await _mediator.Send(query);
            return Ok(rs);
        }

        [HttpGet("job")]
        public async Task<IActionResult> GetJobPostsSummarAsync([FromQuery] GetJobPostsSummaryQuery query)
        {
            var rs = await _mediator.Send(query);
            return Ok(rs);
        }
    }
}
