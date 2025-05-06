using ITJobs.Infrastructure.SqlServer.Repositories;
using ITJobs.Infrastructure.SqlServer.UnitOfWork;
using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddSqlServerServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ITJobsDbContext>(options =>
            {
                options.UseLazyLoadingProxies();
                options.UseSqlServer(configuration.GetConnectionString("MyDbConnectString"));

                //logging sql to console
                options.EnableSensitiveDataLogging();//kiểu mấy cái tham số á
                options.LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Information);
            });
            //repository
            services.AddScoped<IAppUserRepository,AppUserRepository>();
            services.AddScoped<ICandidateRepository,CandidateRepository>();
            //unit of work
            services.AddScoped<IUnitOfWork, UnitOfWork.UnitOfWork>();

            return services;
        }
    }
}
