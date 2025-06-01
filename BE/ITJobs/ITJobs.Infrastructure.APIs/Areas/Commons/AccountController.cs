using ITJobs.Entities.Exceptions;
using ITJobs.Infrastructure.APIs.MyExtensions;
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
        public async Task<IActionResult> LoginAsync([FromBody] LoginQuery data)
        {
            try
            {
                var rs = await _mediator.Send(data);
                return Ok(rs);
            }
            catch (UserNotFoundException e)
            {
                return NotFound(new { message = e.Message });
            }
            catch (UserLockedException e)
            {
                return BadRequest(new { message = e.Message });
            }
        }


        [HttpPatch("update-image")]
        public async Task<IActionResult> UpdateImageAsync([FromBody] UseCases.Commons.Accounts.Commands.UpdateImageCommand command)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "Vui lòng đăng nhập lại." });
            }
            command.UserId = userId.Value;
            try
            {
                var rs = await _mediator.Send(command);
                return Ok(new { imageUrl = rs });
            }
            catch (UserNotFoundException e)
            {
                return NotFound(new { message = e.Message });
            }
        }
    }
}
