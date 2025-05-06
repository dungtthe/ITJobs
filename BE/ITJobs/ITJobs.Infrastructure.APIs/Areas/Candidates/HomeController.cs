using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Candidates
{
    [Area("Candidate")]
    [Route("api/candidate")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        [HttpGet("testcandidate")]
        public async Task<IActionResult> Get()
        {
            await Task.CompletedTask;
            return Ok("test candidate");
        }
    }
}
