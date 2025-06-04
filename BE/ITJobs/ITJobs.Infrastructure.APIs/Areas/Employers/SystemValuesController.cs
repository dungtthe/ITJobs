using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Employers
{
    [Area("Employer")]
    [Route("api/employer/system-value")]
    [ApiController]
    [Authorize]
    public class SystemValuesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public SystemValuesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("job-post-fee-per-day")]
        public async Task<IActionResult> GetJobPostFeePerDayAsync()
        {
            var rs = await _mediator.Send(new ITJobs.UseCases.Employers.SystemValues.Queries.GetJobPostFeePerDay.GetJobPostPricePerDayQuery());
            return Ok(new { fee = rs });
        }
    }
}
