using ITJobs.Infrastructure.SqlServer;
using ITJobs.Infrastructure.SqlServer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ITJobs.Infrastructure.APIs.Areas.Admins
{
    [Area("Admin")]
    [Route("api/admin")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ITJobsDbContext _context;
        public HomeController(ITJobsDbContext context)
        {
            _context = context;
        }


        [HttpGet("/seed")]
        public async Task<IActionResult> Seed()
        {
            //Skills
            if (!_context.Skills.Any())
            {
                var skills = new List<Skill>
                            {
                                new Skill { Id = Guid.NewGuid(), Name = "C#", Description = "Ngôn ngữ lập trình hướng đối tượng mạnh mẽ của Microsoft, thường dùng trong phát triển phần mềm Windows và ASP.NET." },
                                new Skill { Id = Guid.NewGuid(), Name = "C++", Description = "Ngôn ngữ lập trình đa mục đích, hiệu năng cao, thường dùng trong lập trình hệ thống, game và nhúng." },
                                new Skill { Id = Guid.NewGuid(), Name = "Java", Description = "Ngôn ngữ lập trình phổ biến dùng cho backend, Android và hệ thống lớn." },
                                new Skill { Id = Guid.NewGuid(), Name = "Python", Description = "Ngôn ngữ đơn giản, dễ đọc, mạnh trong AI, Machine Learning, Automation và Web." },
                                new Skill { Id = Guid.NewGuid(), Name = "JavaScript", Description = "Ngôn ngữ lập trình phổ biến cho web frontend, cũng dùng trong backend (Node.js)." },
                                new Skill { Id = Guid.NewGuid(), Name = "TypeScript", Description = "Một biến thể của JavaScript có hỗ trợ kiểu tĩnh, thường dùng trong frontend hiện đại." },
                                new Skill { Id = Guid.NewGuid(), Name = "ReactJS", Description = "Thư viện JavaScript để xây dựng UI động, đặc biệt là SPA." },
                                new Skill { Id = Guid.NewGuid(), Name = "Angular", Description = "Framework mạnh mẽ cho frontend do Google phát triển, sử dụng TypeScript." },
                                new Skill { Id = Guid.NewGuid(), Name = "VueJS", Description = "Framework frontend nhẹ, dễ học, phổ biến trong cộng đồng open-source." },
                                new Skill { Id = Guid.NewGuid(), Name = "Node.js", Description = "Môi trường chạy JavaScript ở backend, phù hợp với ứng dụng real-time và API server." },
                                new Skill { Id = Guid.NewGuid(), Name = "ASP.NET Core", Description = "Framework phát triển web mạnh mẽ của Microsoft, dùng với C#." },
                                new Skill { Id = Guid.NewGuid(), Name = "DevOps", Description = "Văn hóa và công cụ giúp tự động hóa quy trình phát triển, triển khai phần mềm." },
                                new Skill { Id = Guid.NewGuid(), Name = "Docker", Description = "Công cụ container hóa ứng dụng, giúp đóng gói và triển khai linh hoạt." },
                                new Skill { Id = Guid.NewGuid(), Name = "Kubernetes", Description = "Nền tảng điều phối container, dùng để triển khai và mở rộng ứng dụng ở quy mô lớn." },
                                new Skill { Id = Guid.NewGuid(), Name = "AWS", Description = "Dịch vụ điện toán đám mây hàng đầu của Amazon, hỗ trợ backend, storage, AI, v.v." },
                                new Skill { Id = Guid.NewGuid(), Name = "Azure", Description = "Nền tảng đám mây toàn diện của Microsoft, dùng cho ứng dụng .NET, SQL, DevOps." },
                                new Skill { Id = Guid.NewGuid(), Name = "SQL Server", Description = "Hệ quản trị cơ sở dữ liệu quan hệ mạnh mẽ của Microsoft." },
                                new Skill { Id = Guid.NewGuid(), Name = "MySQL", Description = "Cơ sở dữ liệu mã nguồn mở phổ biến, dùng trong nhiều ứng dụng web." },
                                new Skill { Id = Guid.NewGuid(), Name = "PostgreSQL", Description = "Cơ sở dữ liệu mạnh, hỗ trợ tính năng nâng cao như JSON, full-text search." },
                                new Skill { Id = Guid.NewGuid(), Name = "MongoDB", Description = "Cơ sở dữ liệu NoSQL phổ biến, lưu trữ dạng tài liệu (document)." },
                                new Skill { Id = Guid.NewGuid(), Name = "Redis", Description = "Cơ sở dữ liệu key-value siêu nhanh, dùng caching và real-time processing." },
                                new Skill { Id = Guid.NewGuid(), Name = "Jest", Description = "Framework test cho JavaScript/TypeScript, phổ biến với ReactJS." },
                                new Skill { Id = Guid.NewGuid(), Name = "Selenium", Description = "Công cụ kiểm thử UI tự động cho trình duyệt." },
                                new Skill { Id = Guid.NewGuid(), Name = "Jira", Description = "Công cụ quản lý dự án và bug, phổ biến trong các team Agile/Scrum." },
                                new Skill { Id = Guid.NewGuid(), Name = "Git", Description = "Hệ thống quản lý mã nguồn phân tán phổ biến nhất hiện nay." },
                                new Skill { Id = Guid.NewGuid(), Name = "Machine Learning", Description = "Kỹ thuật cho phép máy tính học từ dữ liệu, thường dùng với Python." },
                                new Skill { Id = Guid.NewGuid(), Name = "Data Science", Description = "Phân tích và trực quan hóa dữ liệu để tạo ra thông tin giá trị." },
                            };
                await _context.Skills.AddRangeAsync(skills);
            }

            await _context.SaveChangesAsync();
            return Ok("hihi");
        }

        [HttpGet("testadmin")]
        public async Task<IActionResult> Get()
        {
            await Task.CompletedTask;
            return Ok("test admin");
        }
    }
}
