using ITJobs.Infrastructure.APIs.MyExtensions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace ITJobs.Infrastructure.APIs.Areas.Employers
{
    [Area("Employer")]
    [Route("api/employer")]
    [ApiController]
    [Authorize]
    public class EmployerController : ControllerBase
    {
        private readonly IMediator _mediator;
        public EmployerController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetMyProfileAsync([FromQuery] UseCases.Employers.CompanyProfiles.Queries.GetCompanyProfile.GetCompanyProfileQuery query)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "Vui lòng đăng nhập lại." });
            }
            query.UserId = userId.Value;
            var rs = await _mediator.Send(query);
            return Ok(rs);
        }
    }
}
