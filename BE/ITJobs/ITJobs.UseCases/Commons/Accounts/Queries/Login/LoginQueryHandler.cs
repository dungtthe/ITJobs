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
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;

        public LoginQueryHandler(IAppUserRepository appUserRepository,ITokenService tokenService, IHttpContextInfoAccessor httpContextInfoAccessor)
        {
            _appUserRepository = appUserRepository;
            _tokenService = tokenService;
            _httpContextInfoAccessor = httpContextInfoAccessor;
        }
        public async Task<ResponeLoginDTO> Handle(RequestLoginDTO request, CancellationToken cancellationToken)
        {
            string ipClient = _httpContextInfoAccessor.GetClientIpV4();

            await LoggerHelper.LogInfomationAsync(ipClient,"LoginQueryHandler", JsonConvert.SerializeObject(request));
            var user = await _appUserRepository.GetUserByUserNameAsync(request.UserName);
            if (user == null || user.Password != Security.HashPassword(request.Password))
            {
                string error = (user == null) ? "Sai tên tài khoản" : "Sai mật khẩu";
                await LoggerHelper.LogInfomationAsync(ipClient, "LoginQueryHandler ",error + JsonConvert.SerializeObject(request));
                return new ResponeLoginDTO()
                {
                    HttpStatusCode = HttpStatusCode.NotFound,
                    Message = "Tài khoản hoặc mật khẩu không đúng"
                };
            }

            if (user.IsLocked)
            {

                await LoggerHelper.LogInfomationAsync(ipClient, "LoginQueryHandler", "locked " + JsonConvert.SerializeObject(request));

                return new ResponeLoginDTO()
                {
                    HttpStatusCode = HttpStatusCode.Forbidden,
                    Message = "Tài khoản đã bị khóa"
                };
            }

            await LoggerHelper.LogInfomationAsync(ipClient, "LoginQueryHandler","login ok " + JsonConvert.SerializeObject(request));

            return new ResponeLoginDTO()
            {
                FullName = user.FullName,
                Image = user.Image,
                Token = _tokenService.GenerateJwtToken(user),
            };
        }
    }
}
