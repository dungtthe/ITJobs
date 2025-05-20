using ITJobs.Entities.Exceptions;
using ITJobs.UseCases.Admins.Users.Employers.Commands.CreateEmployer;
using ITJobs.UseCases.Admins.Users.Employers.Commands.LockAccountEmployer;
using ITJobs.UseCases.Candidates.Accounts.Commands.Register;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
            var rs = await _mediator.Send(command);
            return Ok(rs);
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
    }
}
