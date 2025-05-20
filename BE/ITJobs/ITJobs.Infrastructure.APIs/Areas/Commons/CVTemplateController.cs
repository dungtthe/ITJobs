using ITJobs.Infrastructure.APIs.MyExtensions;
using ITJobs.UseCases.Commons.CVTemplates.Commands.CreateCVTemplate;
using ITJobs.UseCases.Commons.CVTemplates.Queries.GetCVTemplates;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Commons
{
    [Route("api/cv-template")]
    [ApiController]
    [Authorize]
    public class CVTemplateController : ControllerBase
    {
        private readonly IMediator _mediator;
        public CVTemplateController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpPost("add")]
        public async Task<IActionResult> AddCVTemplateAsync([FromBody] CreateCVTemplateCommand command)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "Vui lòng đăng nhập lại." });
            }
            command.UserId = userId.Value;

            var rs = await _mediator.Send(command);
            return Ok(new { id = rs });
        }


        [HttpGet("")]
        public async Task<IActionResult> GetCVTemplatesAsync([FromQuery] GetCVTemplatesQuery query)
        {
            var rs = await _mediator.Send(query);
            return Ok(rs);
        }
    }
}
