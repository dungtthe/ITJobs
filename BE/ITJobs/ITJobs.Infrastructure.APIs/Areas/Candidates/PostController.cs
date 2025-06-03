using MediatR;
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
    }

}
