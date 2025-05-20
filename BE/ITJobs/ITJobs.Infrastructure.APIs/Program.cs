using ITJobs.Infrastructure.APIs.MyMiddlewares;
using ITJobs.Infrastructure.APIs.Services;
using ITJobs.Infrastructure.ExternalServices;
using ITJobs.Infrastructure.SqlServer;
using ITJobs.UseCases;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

//usecase service
builder.Services.AddUsecaseServices();

//sql server service
builder.Services.AddSqlServerServices(builder.Configuration);

//external service
builder.Services.AddExternalServices();

//service in webapi
builder.Services.AddHttpContextAccessor(); // Cho phép truy cập HttpContext, hỗ trợ cái IHttpContextInfoAccessor
builder.Services.AddWebApiServices();


//add jwt
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true, // Yêu cầu Kiểm tra Issuer
        ValidateAudience = false, // Không cần Kiểm tra Audience
        ValidateLifetime = true, // Yêu cầu Kiểm tra thời hạn của token
        ClockSkew = TimeSpan.Zero, // Loại bỏ thời gian lệch,check thời hạn thêm chính xác
        ValidateIssuerSigningKey = true, // Yêu cầu Kiểm tra Signature
        ValidIssuer = builder.Configuration["Jwt:Issuer"], // Cấu hình Issuer
                                                           // ValidAudience = builder.Configuration["Jwt:Audience"], // Cấu hình Audience
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
    };

    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
            {
                //context.Response.Headers.Add("Token-Expired", "true");
            }
            return Task.CompletedTask;
        }
    };
});


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseMiddleware<GlobalExceptionMiddleware>();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseAuthorization();

app.MapControllers();




//Area
app.MapAreaControllerRoute(
    name: "AdminArea",
    areaName: "Admin",
    pattern: "admin/{controller=Home}/{action=Index}/{id?}"
);
app.MapAreaControllerRoute(
    name: "EmployerArea",
    areaName: "Employer",
    pattern: "employer/{controller=Home}/{action=Index}/{id?}"
);
app.MapAreaControllerRoute(
    name: "CandidateArea",
    areaName: "Candidate",
    pattern: "candidate/{controller=Home}/{action=Index}/{id?}"
);
// Route mặc định
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}"
);


app.Run();
