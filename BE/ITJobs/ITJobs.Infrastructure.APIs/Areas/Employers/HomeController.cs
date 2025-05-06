using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Employers
{
    [Area("Employer")]
    [Route("api/employer")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        [HttpGet("testemployer")]
        public async Task<IActionResult> Get()
        {
            await Task.CompletedTask;
            return Ok("test employer");
        }
    }
}
