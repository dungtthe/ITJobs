using ITJobs.UseCases.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.APIs.Services
{
    public class HttpContextInfoAccessor : IHttpContextInfoAccessor
    {
        private readonly IHttpContextAccessor _accessor;
        public HttpContextInfoAccessor(IHttpContextAccessor accessor)
        {
            _accessor = accessor;
        }

        public string GetClientIpV4()
        {
            var context = _accessor.HttpContext;
            if (context == null) return string.Empty;

            var ipString = context.Request.Headers["X-Forwarded-For"].FirstOrDefault()
                           ?? context.Connection.RemoteIpAddress?.ToString();

            // Chuyển IPv6 localhost (::1) thành IPv4
            if (ipString == "::1")
                return "127.0.0.1";

            // Nếu IP là dạng IPv6-mapped IPv4 (::ffff:192.168.1.12), bóc ra phần IPv4
            if (ipString != null && ipString.StartsWith("::ffff:"))
                return ipString.Substring("::ffff:".Length);

            return ipString ?? string.Empty;
        }

    }
}
