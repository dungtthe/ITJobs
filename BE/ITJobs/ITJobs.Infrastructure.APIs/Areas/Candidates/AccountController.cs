using ITJobs.Entities.Exceptions;
using ITJobs.Infrastructure.Commons.Consts;
using ITJobs.UseCases.Candidates.Accounts.Commands.Register;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Candidates
{
    [Area("Candidate")]
    [Route("api/candidate")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AccountController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterAccountCommand command)
        {
            try
            {
                var rs = await _mediator.Send(command);
                return Ok(new { message = rs });
            }
            catch (EmailAlreadyExistsException e)
            {
                return Conflict(new { message = e.Message });
            }
        }
    }
}
