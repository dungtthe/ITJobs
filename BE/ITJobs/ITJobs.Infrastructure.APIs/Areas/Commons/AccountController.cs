using ITJobs.Infrastructure.Commons.Consts;
using ITJobs.UseCases.Candidates.Accounts.Commands.Register;
using ITJobs.UseCases.Commons.Accounts.Queries.Login;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Commons
{

    [Route("api")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMediator _mediator;
        public AccountController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] RequestLoginDTO data)
        {
            var rs = await _mediator.Send(data);
            if (rs.HttpStatusCode == HttpStatusCode.Forbidden|| rs.HttpStatusCode == HttpStatusCode.BadRequest)
            {
                return StatusCode(rs.HttpStatusCode,new { message = rs.Message });
            }
            return Ok(rs);
        }
    }
}
