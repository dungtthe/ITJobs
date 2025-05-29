using ITJobs.UseCases.Commons.Skills.Queries.GetSkills;
using ITJobs.UseCases.Commons.Skills.Queries.GetSuggestedSkillsSummary;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Commons
{
    [Route("api/skill")]
    [ApiController]
    public class SkillController : ControllerBase
    {
        private readonly IMediator _mediator;
        public SkillController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("suggestions")]
        public async Task<IActionResult> GetSuggestedSkillsSummary([FromQuery] GetSuggestedSkillsSummaryQuery query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);
        }


        [HttpGet("")]
        public async Task<IActionResult> GetSkills([FromQuery] GetSkillsQuery query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);
        }
    }
}
