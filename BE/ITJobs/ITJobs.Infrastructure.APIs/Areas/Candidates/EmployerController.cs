using ITJobs.UseCases.Candidates.Employers.Queries.GetTopEmployersByApplicationsSummary;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Candidates
{
    [Route("api/candidate/employer")]
    [ApiController]
    public class EmployerController : ControllerBase
    {
        private readonly IMediator _mediator;
        public EmployerController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("top-employer")]
        public async Task<IActionResult> GetTopEmployersByApplicationsSummaryAsync([FromQuery] GetTopEmployersByApplicationsSummaryQuery query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);
        }


        [HttpGet("summary/{userId}")]
        public async Task<IActionResult> GetEmployerSummaryAsync([FromRoute] Guid userId)
        {

            var query = new UseCases.Candidates.Employers.Queries.GetEmployerSummary.GetEmployerSummaryQuery { UserId = userId };

            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("company-profile/{userId}")]
        public async Task<IActionResult> GetCompanyProfileAsync([FromRoute] Guid userId)
        {
            var query = new UseCases.Candidates.Employers.Queries.GetCompanyProfile.GetCompanyProfileQuery { UserId = userId };
            var result = await _mediator.Send(query);
            return Ok(result);
        }
    }
}
