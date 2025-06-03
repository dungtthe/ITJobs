using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Shared
{
    [Route("api/employer")]
    [ApiController]
    public class EmployerController : ControllerBase
    {
        private readonly IMediator _mediator;
        public EmployerController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("top-employer")]
        public async Task<IActionResult> GetTopEmployersByApplicationsSummaryAsync([FromQuery] UseCases.Shared.Employers.Queries.GetTopEmployersByApplicationsSummary.GetTopEmployersByApplicationsSummaryQuery query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);
        }
    }
}
