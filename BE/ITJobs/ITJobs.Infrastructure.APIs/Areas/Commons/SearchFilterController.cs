using ITJobs.UseCases.Commons.SearchFilters.Queries.GetSuggestedSkills;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Commons
{
    [Route("api/search-filter")]
    [ApiController]
    public class SearchFilterController : ControllerBase
    {
        private readonly IMediator _mediator;
        public SearchFilterController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("skill/suggestions")]
        public async Task<IActionResult> GetSuggestedSkillsSummary([FromQuery] GetSuggestedSkillsQuery query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);
        }

    }
}
