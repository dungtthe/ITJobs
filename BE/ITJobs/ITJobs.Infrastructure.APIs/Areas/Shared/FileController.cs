using ITJobs.Infrastructure.APIs.MyExtensions;
using ITJobs.Infrastructure.Commons.Helpers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Configuration.UserSecrets;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace ITJobs.Infrastructure.APIs.Areas.Shared
{
    [Route("api/file")]
    [ApiController]
    public class FileController : ControllerBase
    {

        private readonly IMediator _mediator;
        public FileController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [Authorize]
        [HttpPost("upload")]
        public async Task<IActionResult> UploadFiles([FromQuery] string actionType, List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
                return BadRequest("Không có file nào được gửi");

            if (string.IsNullOrWhiteSpace(actionType))
                return BadRequest();

            var allowedTypes = new[] { "upload-cv" };
            actionType = actionType.ToLower();

            if (!allowedTypes.Contains(actionType))
                return BadRequest("File không hợp lệ");

            string uploadPath = actionType switch
            {
                "upload-cv" => Utils.GetPathUploadCV(),
                _ => Utils.GetPathUpload()
            };

            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            var savedFileNames = new List<string>();

            var CVs = new List<Entities.CV>();


            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    var originalFileName = file.FileName;
                    var ext = Path.GetExtension(file.FileName);
                    var fileName = $"{Guid.NewGuid()}{ext}";
                    var filePath = Path.Combine(uploadPath, fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                    savedFileNames.Add(fileName);
                    CVs.Add(new Entities.CV()
                    {
                        OriginalFileName = originalFileName,
                        FileName = fileName,
                    });
                }
            }

            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return Unauthorized(new { message = "Vui lòng đăng nhập lại." });
            }

            try
            {

                var command = new UseCases.Candidates.Accounts.Commands.UploadCVs.UploadCVsCommand()
                {
                    UserId = userId.Value,
                    CVs = CVs
                };
                CVs = await _mediator.Send(command);
            }
            catch
            {
                foreach (var fileName in savedFileNames)
                {
                    var filePath = Path.Combine(uploadPath, fileName);
                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath);
                    }
                }

                throw;
            }

            return Ok(CVs);
        }


        [HttpGet("image")]
        public IActionResult ViewImage([FromQuery] string fileName)
        {
            if (string.IsNullOrWhiteSpace(fileName))
                return BadRequest("Thiếu fileName");

            var filePath = Path.Combine(Utils.GetPathUploadImage(), fileName);

            if (!System.IO.File.Exists(filePath))
                return NotFound("Không tìm thấy ảnh");

            var mimeType = GetMimeType(filePath);
            var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            return File(stream, mimeType);
        }


        private string GetMimeType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(path, out var contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }

        [HttpGet("cv")]
        public IActionResult ViewCV([FromQuery] string fileName)
        {
            if (string.IsNullOrWhiteSpace(fileName))
                return BadRequest("Thiếu fileName");

            var filePath = Path.Combine(Utils.GetPathUploadCV(), fileName);

            if (!System.IO.File.Exists(filePath))
                return NotFound("Không tìm thấy CV");

            var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            return File(stream, "application/pdf");
        }

    }
}
