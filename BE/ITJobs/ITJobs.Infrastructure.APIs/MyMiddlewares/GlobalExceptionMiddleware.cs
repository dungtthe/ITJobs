using FluentValidation;
using ITJobs.Infrastructure.Commons.Consts;
using ITJobs.Infrastructure.Commons.Helpers;
using ITJobs.UseCases.Interfaces.Services;

namespace ITJobs.Infrastructure.APIs.MyMiddlewares
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public GlobalExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (FluentValidation.ValidationException ex)
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                context.Response.ContentType = "application/json";

                var errors = ex.Errors
                    .GroupBy(x => x.PropertyName)
                    .ToDictionary(
                        g => g.Key,
                        g => g.Select(x => x.ErrorMessage).ToArray()
                    );

                var response = new
                {
                    errors
                };

                await context.Response.WriteAsJsonAsync(response);
            }
            catch (Exception ex)
            {
                // Lấy IHttpContextInfoAccessor từ DI container
                var infoAccessor = context.RequestServices.GetService<IHttpContextInfoAccessor>();
                var clientIp = infoAccessor?.GetClientIpV4() ?? "";
                await LoggerHelper.LogExceptionAsync(clientIp, "GlobalExceptionMiddleware","",ex);
                context.Response.StatusCode = 500;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsJsonAsync(HttpStatusCode.HeThongGapSuCo);
            }
        }
    }
}
