using FluentValidation;
using ITJobs.Infrastructure.Commons.Consts;
using ITJobs.Infrastructure.Commons.Helpers;
using ITJobs.UseCases.Interfaces.ExternalServices;

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

                //var response = new
                //{
                //    errors
                //};

                var messages = ex.Errors
                            .Select(x => x.ErrorMessage)
                            .ToList();

                var response = new
                {
                    message = messages
                };

                await context.Response.WriteAsJsonAsync(response);
            }
            catch (ITJobs.Entities.Exceptions.UserNotFoundException e)
            {
                context.Response.StatusCode = StatusCodes.Status404NotFound;
                context.Response.ContentType = "application/json";
                var response = new
                {
                    message = e.Message
                };
            }
            catch (ITJobs.Entities.Exceptions.ForbiddenAccessException e)
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                context.Response.ContentType = "application/json";
                var response = new
                {
                    message = e.Message
                };
                await context.Response.WriteAsJsonAsync(response);
            }
            catch (ITJobs.Entities.Exceptions.InvalidPostException.InvalidJobPostingException e)
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                context.Response.ContentType = "application/json";
                var response = new
                {
                    message = e.Message
                };
                await context.Response.WriteAsJsonAsync(response);
            }
            catch (ITJobs.Entities.Exceptions.InvalidBalanceException e)
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                context.Response.ContentType = "application/json";
                var response = new
                {
                    message = e.Message
                };
                await context.Response.WriteAsJsonAsync(response);
            }
            catch (ITJobs.Entities.Exceptions.EmailAlreadyExistsException e)
            {
                context.Response.StatusCode = StatusCodes.Status409Conflict;
                context.Response.ContentType = "application/json";
                var response = new
                {
                    message = e.Message
                };
                await context.Response.WriteAsJsonAsync(response);
            }
            catch (ITJobs.Entities.Exceptions.PhoneNumberAlreadyExistsException e)
            {
                context.Response.StatusCode = StatusCodes.Status409Conflict;
                context.Response.ContentType = "application/json";
                var response = new
                {
                    message = e.Message
                };
                await context.Response.WriteAsJsonAsync(response);
            }
            catch (ITJobs.Entities.Exceptions.SystemDataNotImplementedException e)
            {
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                context.Response.ContentType = "application/json";
                var response = new
                {
                    message = e.Message
                };
                await context.Response.WriteAsJsonAsync(response);
            }
            catch (ITJobs.Entities.Exceptions.EducationNotFoundException e)
            {
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                context.Response.ContentType = "application/json";
                var response = new
                {
                    message = e.Message
                };
                await context.Response.WriteAsJsonAsync(response);
            }
            catch (ITJobs.Entities.Exceptions.CertificationNotFoundException e)
            {
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                context.Response.ContentType = "application/json";
                var response = new
                {
                    message = e.Message
                };
                await context.Response.WriteAsJsonAsync(response);
            }
            catch (ITJobs.Entities.Exceptions.WorkExperienceNotFoundException e)
            {
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                context.Response.ContentType = "application/json";
                var response = new
                {
                    message = e.Message
                };
                await context.Response.WriteAsJsonAsync(response);
            }
            catch (ITJobs.Entities.Exceptions.ProjectNotFoundException e)
            {
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                context.Response.ContentType = "application/json";
                var response = new
                {
                    message = e.Message
                };
                await context.Response.WriteAsJsonAsync(response);
            }
            catch (ITJobs.Entities.Exceptions.AwardNotFoundException e)
            {
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                context.Response.ContentType = "application/json";
                var response = new
                {
                    message = e.Message
                };
                await context.Response.WriteAsJsonAsync(response);
            }
            catch (ITJobs.Entities.Exceptions.PostNotFoundException e)
            {
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                context.Response.ContentType = "application/json";
                var response = new
                {
                    message = e.Message
                };
                await context.Response.WriteAsJsonAsync(response);
            }
            catch (ITJobs.Entities.Exceptions.JobAlreadyAppliedException e)
            {
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                context.Response.ContentType = "application/json";
                var response = new
                {
                    message = e.Message
                };
                await context.Response.WriteAsJsonAsync(response);
            }
            catch (ITJobs.Entities.Exceptions.ConversationNotFoundException e)
            {
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                context.Response.ContentType = "application/json";
                var response = new
                {
                    message = e.Message
                };
                await context.Response.WriteAsJsonAsync(response);
            }

            catch (Exception ex)
            {
                // Lấy IHttpContextInfoAccessor từ DI container
                var infoAccessor = context.RequestServices.GetService<IHttpContextInfoAccessor>();
                var clientIp = infoAccessor?.GetClientIpV4() ?? "";
                await LoggerHelper.LogExceptionAsync(clientIp, "GlobalExceptionMiddleware", "", ex);
                context.Response.StatusCode = 500;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsJsonAsync(HttpStatusCode.HeThongGapSuCo);
            }
        }
    }
}
