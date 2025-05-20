using ITJobs.Entities.Exceptions;
using ITJobs.UseCases.Admins.Users.Candidates.Commands.LockAccountCandidate;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Admins
{
    [Area("Admin")]
    [Route("api/admin/candidate")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private readonly IMediator _mediator;
        public CandidateController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPatch("lock/{UserId}")]
        public async Task<IActionResult> LockAccountAsync([FromRoute] LockAccountCandidateCommand command)
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
