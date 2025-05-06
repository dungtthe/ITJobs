using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Commons
{
    [Route("api")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        [HttpGet("testcommon")]
        public async Task<IActionResult> Get()
        {
            await Task.CompletedTask;
            return Ok("test common");
        }
    }
}
