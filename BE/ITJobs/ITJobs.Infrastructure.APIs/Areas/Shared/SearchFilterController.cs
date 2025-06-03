using ITJobs.Entities.Exceptions;
using ITJobs.UseCases.Shared.SearchFilters.Queries.GetCities;
using ITJobs.UseCases.Shared.SearchFilters.Queries.GetSkills;
using ITJobs.UseCases.Shared.SearchFilters.Queries.GetSuggestedSkills;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Shared
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
            try
            {
                var result = await _mediator.Send(query);
                return Ok(result);
            }
            catch (SystemDataNotImplementedException e)
            {
                return StatusCode(500, new { message = e.Message });
            }
        }

        [HttpGet("skill")]
        public async Task<IActionResult> GetSkills([FromQuery] GetSkillsQuery query)
        {
            try
            {
                var result = await _mediator.Send(query);
                return Ok(result);
            }
            catch (SystemDataNotImplementedException e)
            {
                return StatusCode(500, new { message = e.Message });
            }

        }

        [HttpGet("cities")]
        public async Task<IActionResult> GetCitiesAsync([FromQuery] GetCitiesQuery query)
        {
            try
            {
                var result = await _mediator.Send(query);
                return Ok(result);
            }
            catch (SystemDataNotImplementedException e)
            {
                return StatusCode(500, new { message = e.Message });
            }
        }
    }
}
