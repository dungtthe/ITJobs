using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Admins
{
    [Area("Admin")]
    [Route("api/admin")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        [HttpGet("testadmin")]
        public async Task<IActionResult> Get()
        {
            await Task.CompletedTask;
            return Ok("test admin");
        }
    }
}
