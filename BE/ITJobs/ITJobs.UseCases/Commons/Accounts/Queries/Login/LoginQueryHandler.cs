using ITJobs.Entities.Exceptions;
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
using System.Xml.Linq;

namespace ITJobs.UseCases.Commons.Accounts.Queries.Login
{
    public class LoginQueryHandler : IRequestHandler<LoginQuery, UserDto>
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
        public async Task<UserDto> Handle(LoginQuery request, CancellationToken cancellationToken)
        {
            string ipClient = _httpContextInfoAccessor.GetClientIpV4();

            await LoggerHelper.LogInfomationAsync(ipClient,"LoginQueryHandler", JsonConvert.SerializeObject(request));
            var user = await _appUserRepository.GetUserByEmailAsync(request.Email);
            if (user == null || user.Password != Security.HashPassword(request.Password))
            {
                string error = (user == null) ? "Sai tên tài khoản" : "Sai mật khẩu";
                await LoggerHelper.LogInfomationAsync(ipClient, "LoginQueryHandler ",error + JsonConvert.SerializeObject(request));
                throw new UserNotFoundException("Tên tài khoản hoặc mật khẩu không chính xác!");
            }

            if (user.IsLocked)
            {

                await LoggerHelper.LogInfomationAsync(ipClient, "LoginQueryHandler", "locked " + JsonConvert.SerializeObject(request));
                throw new UserLockedException();
            }

            await LoggerHelper.LogInfomationAsync(ipClient, "LoginQueryHandler","login ok " + JsonConvert.SerializeObject(request));

            return new UserDto()
            {
                Name = user.FullName,
                Image = user.Image,
                Token = _tokenService.GenerateJwtToken(user),
                RoleType = user.RoleType
            };
        }
    }
}
