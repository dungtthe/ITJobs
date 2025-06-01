using ITJobs.Entities.Exceptions;
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

        [HttpPatch("profile/update/general-info")]
        public async Task<IActionResult> UpdateGeneralInfoAsync([FromBody] UseCases.Employers.CompanyProfiles.Commands.UpdateGeneralInfos.UpdateGeneralInfosCommand command)
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
                return Ok(new { generalInfos = rs });
            }
            catch (UserNotFoundException e)
            {
                return NotFound(new { message = e.Message });
            }
        }
        [HttpPatch("profile/update/company-introduction")]
        public async Task<IActionResult> UpdateCompanyIntroductionAsync([FromBody] UseCases.Employers.CompanyProfiles.Commands.UpdateCompanyIntroduction.UpdateCompanyIntroductionCommand command)
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
                return Ok(new { companyIntroduction = rs });
            }
            catch (UserNotFoundException e)
            {
                return NotFound(new { message = e.Message });
            }
        }

        [HttpPatch("profile/update/skills")]
        public async Task<IActionResult> UpdateSkillsAsync([FromBody] UseCases.Employers.CompanyProfiles.Commands.UpdateSkills.UpdateSkillsCommand command)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "Vui lòng đăng nhập lại." });
            }
            command.UserId = userId.Value;
            try
            {
                 await _mediator.Send(command);
                return Ok(new{ });
            }
            catch (UserNotFoundException e)
            {
                return NotFound(new { message = e.Message });
            }
            catch (InvalidSkillException e)
            {
                return BadRequest(new { message = e.Message });
            }
            catch (SystemDataNotImplementedException e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = e.Message });
            }
        }
    }
}
