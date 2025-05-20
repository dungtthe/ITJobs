using ITJobs.UseCases.Admins.Users.Employers.Commands.CreateEmployer;
using ITJobs.UseCases.Candidates.Accounts.Commands.Register;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Admins
{
    [Area("Employer")]
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
    }
}
