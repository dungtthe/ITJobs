using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITJobs.Infrastructure.APIs.Areas.Shared
{
    [Route("api/system-value")]
    [ApiController]
    public class SystemValuesController : ControllerBase
    {
        [HttpGet]
        [Route("social-media")]
        public async Task <IActionResult> GetSocialMedias()
        {
            var socialMediaLinks = new List<string>
            {
                "Github",
                "Youtube",
                "Facebook",
                "Instagram",
                "Linkedin",
                "Twitter",
                "Other"
            };
            return Ok(socialMediaLinks);
        }
    }
}
