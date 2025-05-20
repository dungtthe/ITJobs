using ITJobs.UseCases.Admins.SearchFilters.Commands.CreateSearchFilterCheckBox;
using ITJobs.UseCases.Admins.SearchFilters.Commands.CreateSearchFilterCombobox;
using ITJobs.UseCases.Admins.SearchFilters.Commands.CreateSearchFilterRange;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Admins
{
    [Area("Admin")]
    [Route("api/admin/search-filter")]
    [ApiController]
    public class SearchFilterController : ControllerBase
    {
        private readonly IMediator _mediator;
        public SearchFilterController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("add-filter-range")]
        public async Task<IActionResult> AddSearchFilterRangeAsync([FromBody] CreateSearchFilterRangeCommand command)
        {
            var rs = await _mediator.Send(command);
            return Ok(new { id = rs });
        }


        [HttpPost("add-filter-checkbox")]
        public async Task<IActionResult> AddSearchFilterCheckboxAsync([FromBody] CreateSearchFilterCheckBoxCommand command)
        {
            var rs = await _mediator.Send(command);
            return Ok(new { id = rs });
        }

        [HttpPost("add-filter-combobox")]
        public async Task<IActionResult> AddSearchFilterComboboxAsync([FromBody] CreateSearchFilterComboboxCommand command)
        {
            var rs = await _mediator.Send(command);
            return Ok(new { id = rs });
        }
    }
}
