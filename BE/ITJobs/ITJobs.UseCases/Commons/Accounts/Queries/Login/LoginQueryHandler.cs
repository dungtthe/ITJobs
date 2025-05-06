using ITJobs.Infrastructure.Commons.Consts;
using ITJobs.Infrastructure.Commons.Helpers;
using ITJobs.UseCases.Interfaces.ExternalServices;
using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Commons.Accounts.Queries.Login
{
    public class LoginQueryHandler : IRequestHandler<RequestLoginDTO, ResponeLoginDTO>
    {
        private readonly IAppUserRepository _appUserRepository;
        private readonly ITokenService _tokenService;
        public LoginQueryHandler(IAppUserRepository appUserRepository,ITokenService tokenService)
        {
            _appUserRepository = appUserRepository;
            _tokenService = tokenService;
        }
        public async Task<ResponeLoginDTO> Handle(RequestLoginDTO request, CancellationToken cancellationToken)
        {
            await LoggerHelper.LogInfomationAsync("LoginQueryHandler", JsonConvert.SerializeObject(request));
            var user = await _appUserRepository.GetUserByUserNameAsync(request.UserName);
            if (user == null || user.Password != Security.HashPassword(request.Password))
            {
                string error = (user == null) ? "Sai tên tài khoản" : "Sai mật khẩu";
                await LoggerHelper.LogInfomationAsync("LoginQueryHandler ",error + JsonConvert.SerializeObject(request));
                return new ResponeLoginDTO()
                {
                    HttpStatusCode = HttpStatusCode.NotFound,
                    Message = "Tài khoản hoặc mật khẩu không đúng"
                };
            }

            if (user.IsLocked)
            {

                await LoggerHelper.LogInfomationAsync("LoginQueryHandler", "locked " + JsonConvert.SerializeObject(request));

                return new ResponeLoginDTO()
                {
                    HttpStatusCode = HttpStatusCode.Forbidden,
                    Message = "Tài khoản đã bị khóa"
                };
            }

            await LoggerHelper.LogInfomationAsync("LoginQueryHandler","login ok " + JsonConvert.SerializeObject(request));

            return new ResponeLoginDTO()
            {
                FullName = user.FullName,
                Image = user.Image,
                Token = _tokenService.GenerateJwtToken(user),
            };
        }
    }
}
