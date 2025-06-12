using ITJobs.Entities.Enums;
using ITJobs.Entities.Exceptions;
using ITJobs.Infrastructure.APIs.MyExtensions;
using ITJobs.Infrastructure.Commons.Consts;
using ITJobs.Infrastructure.Commons.Helpers;
using ITJobs.UseCases.Candidates.Accounts.Commands.Register;
using MediatR;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("profile")]
        [Authorize]
        public async Task<IActionResult> GetMyProfileAsync([FromQuery] UseCases.Shared.Candidates.Queries.GetCandidateProfile.GetCandidateProfileQuery query)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }
            query.UserId = userId.Value;
            var rs = await _mediator.Send(query);
            return Ok(rs);
        }

        [HttpPatch("profile/update/overview")]
        [Authorize]
        public async Task<IActionResult> UpdateOverviewAsync([FromBody] UseCases.Candidates.Accounts.Commands.UpdateOverviews.UpdateOverviewsCommand command)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }
            command.UserId = userId.Value;
            var rs = await _mediator.Send(command);
            return Ok(new { overview = rs });
        }

        [HttpPatch("profile/update/about-me")]
        [Authorize]
        public async Task<IActionResult> UpdateAboutMeAsync([FromBody] UseCases.Candidates.Accounts.Commands.UpdateAboutme.UpdateAboutmeCommand command)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }
            command.UserId = userId.Value;
            var rs = await _mediator.Send(command);
            return Ok(new { aboutMe = rs });
        }


        [HttpDelete("delete-cv/{cvId}")]
        [Authorize]
        public async Task<IActionResult> DeleteCVAsync([FromRoute] Guid cvId)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "Vui lòng đăng nhập lại." });
            }
            var command = new UseCases.Candidates.Accounts.Commands.DeleteCV.DeleteCVCommand { UserId = userId.Value, CVId = cvId };
            var fileName = await _mediator.Send(command);
            try
            {
                System.IO.File.Delete(Path.Combine(Utils.GetPathUploadCV(), fileName));
            }
            catch (Exception ex)
            {
            }
            return Ok(new { });
        }


        [HttpPatch("profile/update/skills")]
        [Authorize]

        public async Task<IActionResult> UpdateSkillsAsync([FromBody] UseCases.Candidates.Accounts.Commands.UpdateSkills.UpdateCandidateSkillsCommand command)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "Vui lòng đăng nhập lại." });
            }
            command.UserId = userId.Value;

            await _mediator.Send(command);
            return Ok(new { });
        }


        [HttpPost("profile/education/add-or-update")]
        [Authorize]
        public async Task<IActionResult> AddOrUpdateEducationAsync([FromBody] UseCases.Candidates.Accounts.Commands.AddOrUpdateEducation.AddOrUpdateEducationCommand command)
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


        [HttpDelete("profile/education/delete/{educationId}")]
        [Authorize]
        public async Task<IActionResult> DeleteEducationAsync([FromRoute] Guid educationId)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "Vui lòng đăng nhập lại." });
            }
            var command = new UseCases.Candidates.Accounts.Commands.DeleteEducation.DeleteEducationCommand { UserId = userId.Value, EducationId = educationId };
            await _mediator.Send(command);
            return Ok(new { });
        }


        [HttpPost("profile/work-experience/add-or-update")]
        [Authorize]
        public async Task<IActionResult> AddOrUpdateWorkExperienceAsync([FromBody] UseCases.Candidates.Accounts.Commands.AddOrUpdateWorkExperience.AddOrUpdateWorkExperienceCommand command)
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

        [HttpDelete("profile/work-experience/delete/{workExperienceId}")]
        [Authorize]
        public async Task<IActionResult> DeleteWorkExperienceAsync([FromRoute] Guid workExperienceId)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "Vui lòng đăng nhập lại." });
            }
            var command = new UseCases.Candidates.Accounts.Commands.DeleteWorkExperience.DeleteWorkExperienceCommand { UserId = userId.Value, WorkExperienceId = workExperienceId };
            await _mediator.Send(command);
            return Ok(new { });
        }


        [HttpPost("profile/project/add-or-update")]
        [Authorize]
        public async Task<IActionResult> AddOrUpdateProjectAsync([FromBody] UseCases.Candidates.Accounts.Commands.AddOrUpdateProject.AddOrUpdateProjectCommand command)
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

        [HttpDelete("profile/project/delete/{projectId}")]
        [Authorize]
        public async Task<IActionResult> DeleteProjectAsync([FromRoute] Guid projectId)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "Vui lòng đăng nhập lại." });
            }
            var command = new UseCases.Candidates.Accounts.Commands.DeleteProject.DeleteProjectCommand { UserId = userId.Value, ProjectId = projectId };
            await _mediator.Send(command);
            return Ok(new { });
        }


        [HttpPost("profile/certification/add-or-update")]
        [Authorize]
        public async Task<IActionResult> AddOrUpdateCertificationAsync([FromBody] UseCases.Candidates.Accounts.Commands.AddOrUpdateCertification.AddOrUpdateCertificationCommand command)
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

        [HttpDelete("profile/certification/delete/{certificationId}")]
        [Authorize]
        public async Task<IActionResult> DeleteCertificationAsync([FromRoute] Guid certificationId)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "Vui lòng đăng nhập lại." });
            }
            var command = new UseCases.Candidates.Accounts.Commands.DeleteCertification.DeleteCertificationCommand { UserId = userId.Value, CertificationId = certificationId };
            await _mediator.Send(command);
            return Ok(new { });
        }
    }
}
