using ITJobs.Entities.Exceptions;
using ITJobs.UseCases.Admins.Users.Employers.Commands.CreateEmployer;
using ITJobs.UseCases.Admins.Users.Employers.Commands.LockAccountEmployer;
using ITJobs.UseCases.Admins.Users.Employers.Queries.GetCompayNames;
using ITJobs.UseCases.Admins.Users.Employers.Queries.GetEmployerByUserId;
using ITJobs.UseCases.Admins.Users.Employers.Queries.GetEmployersSummary;
using ITJobs.UseCases.Candidates.Accounts.Commands.Register;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Writers;

namespace ITJobs.Infrastructure.APIs.Areas.Admins
{
    [Area("Admin")]
    [Route("api/admin/employer")]
    [ApiController]
    public class EmployerController : ControllerBase
    {
        private readonly IMediator _mediator;
        public EmployerController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddAsync([FromBody] CreateEmployerCommand command)
        {
            try
            {
                var rs = await _mediator.Send(command);
                return Ok(new { id = rs });
            }
            catch (EmailAlreadyExistsException e)
            {
                return Conflict(new { message = e.Message });
            }
        }

        [HttpPatch("lock/{UserId}")]
        public async Task<IActionResult> LockAccountAsync([FromRoute] LockAccountEmployerCommand command)
        {
            try
            {

                var rs = await _mediator.Send(command);
                return Ok(new { message = rs });
            }
            catch (UserNotFoundException e)
            {
                return NotFound(new { message = e.Message });
            }
        }

        [HttpGet("")]
        public async Task<IActionResult> GetEmployersSummarAsync([FromQuery] GetEmployersSummaryQuery query)
        {
            var rs = await _mediator.Send(query);
            return Ok(rs);
        }


        [HttpGet("{UserId}")]
        public async Task<IActionResult> GetEmployerByUserIdAsync([FromRoute] GetEmployerByUserIdQuery query)
        {
            try
            {
                var rs = await _mediator.Send(query);
                return Ok(rs);
            }
            catch (UserNotFoundException e)
            {
                return NotFound(new { message = e.Message });
            }

        }

        [HttpGet("company-names")]
        public async Task<IActionResult> GetCompanyNamesAsync([FromQuery] GetCompayNamesQuery query)
        {
            var rs = await _mediator.Send(query);
            return Ok(rs);
        }

    }
}
