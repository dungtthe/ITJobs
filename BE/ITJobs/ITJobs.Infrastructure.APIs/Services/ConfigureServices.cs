using ITJobs.UseCases.Interfaces.ExternalServices;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.APIs.Services
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddWebApiServices(this IServiceCollection services)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IHttpContextInfoAccessor, HttpContextInfoAccessor>();
            return services;
        }
    }
}
