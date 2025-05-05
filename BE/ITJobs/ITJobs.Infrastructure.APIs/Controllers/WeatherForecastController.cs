using ITJobs.Infrastructure.SqlServer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ITJobs.Infrastructure.APIs.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {

        private readonly ITJobsDbContext _context;
        public WeatherForecastController(ITJobsDbContext context)
        {
            _context = context;
        }

        //test DB
        [HttpGet("/testget")]
        public async Task<IActionResult> Get()
        {
            var rs = await _context.Users.ToListAsync();
            return Ok(rs);
        }


        [HttpPost("/testadd")]
        public async Task<IActionResult> Add()
        {
            await _context.Users.AddAsync(new SqlServer.Models.AppUser()
            {
                UserName = "test1",
                Password = "test2",
                FullName = "test3",
                Email = "test4@gmail.com",
                RoleType = Entities.Enums.RoleType.Candidate,
            });
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
