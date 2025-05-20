using ITJobs.UseCases.Interfaces.ExternalServices;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.ExternalServices
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddExternalServices(this IServiceCollection services)
        {
            services.AddTransient<IEmailService, EmailService>();
            return services;
        }
    }
}
