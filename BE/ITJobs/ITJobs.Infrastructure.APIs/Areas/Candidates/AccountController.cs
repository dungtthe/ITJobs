using ITJobs.Infrastructure.Commons.Consts;
using ITJobs.UseCases.Candidates.Accounts.Commands.Register;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Candidates
{
    [Area("Candidate")]
    [Route("api/candidate/register")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AccountController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpPost]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterAccountCommand command)
        {
            var rs = await _mediator.Send(command);

            if(rs.HttpStatusCode == HttpStatusCode.Ok)
            {
                return Ok(new { message = rs.Message});
            }
            return BadRequest(rs.Message);
        }
    }
}
