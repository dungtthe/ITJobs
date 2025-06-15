using ITJobs.Infrastructure.APIs.MyExtensions;
using ITJobs.UseCases.Candidates.Posts.Queries.GetBlogPostsSummary;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Candidates
{
    [Route("api/candidate/post")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IMediator _mediator;
        public PostController(IMediator mediator)
        {
            _mediator = mediator;
        }



        [HttpGet("top-blog")]
        public async Task<IActionResult> GetTopBlogPostsByViewCountSummaryAsync([FromQuery] UseCases.Candidates.Posts.Queries.GetTopBlogPostsByViewCountSummary.GetTopBlogPostsByViewCountSummaryQuery query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);

        }

        [HttpGet("blog")]
        public async Task<IActionResult> GetBlogPostsSummaryAsync([FromQuery] GetBlogPostsSummaryQuery query)
        {
            var rs = await _mediator.Send(query);
            return Ok(rs);
        }


        [HttpGet("random-blog")]
        public async Task<IActionResult> GetRandomBlogPostsSummaryAsync([FromQuery] UseCases.Candidates.Posts.Queries.GetRandomBlogPostsSummary.GetRandomBlogPostsSummaryQuery query)
        {
            var rs = await _mediator.Send(query);
            return Ok(rs);
        }

        [HttpGet("blog/{id}")]
        public async Task<IActionResult> GetBlogPostByIdAsync([FromRoute] UseCases.Candidates.Posts.Queries.GetBlogPostById.GetBlogPostByIdQuery query)
        {
            var rs = await _mediator.Send(query);
            return Ok(rs);
        }

        [HttpGet("job")]
        public async Task<IActionResult> GetJobPostsSummaryAsync([FromQuery] Guid userId)
        {
            var query = new UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary.GetActiveJobPostsSummaryByUserId.GetActiveJobPostsSummaryByUserIdQuery();
            query.UserId = userId;
            var rs = await _mediator.Send(query);
            return Ok(rs);
        }

        [HttpGet("job/{postId}")]
        public async Task<IActionResult> GetJobPostByIdAsync([FromRoute] UseCases.Candidates.Posts.Queries.GetJobPostById.GetJobPostByIdQuery query)
        {
            var rs = await _mediator.Send(query);
            return Ok(rs);
        }

        [HttpGet("random-job")]
        public async Task<IActionResult> GetRandomJobPostsSummaryAsync([FromQuery] UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary.GetActiveJobPostsRandomSummary.GetActiveJobPostsRandomSummaryQuery query)
        {
            var rs = await _mediator.Send(query);
            return Ok(rs);
        }


        [HttpPost("job/apply")]
        [Authorize]
        public async Task<IActionResult> ApplyJobPostAsync([FromBody] UseCases.Candidates.JobApplications.Commands.AddJobApplication.AddJobApplicationCommand command)
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

        [HttpPost("job/search")]
        public async Task<IActionResult> GetActiveJobPostsSummaryBySearchFilters([FromBody] UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary.GetActiveJobPostsSummaryBySearchFilters.GetActiveJobPostsSummaryBySearchFiltersQuery query)
        {
            var rs = await _mediator.Send(query);
            return Ok(rs);
        }

        [HttpGet("job/apply-history")]
        [Authorize]
        public async Task<IActionResult> GetJobApplicationHistoriesAsync([FromQuery] UseCases.Candidates.JobApplications.Queries.GetJobApplicationHistories.GetJobApplicationHistoriesQuery query)
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
