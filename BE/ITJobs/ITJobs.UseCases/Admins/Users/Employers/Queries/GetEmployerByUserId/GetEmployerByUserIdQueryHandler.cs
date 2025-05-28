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

namespace ITJobs.UseCases.Admins.Users.Employers.Queries.GetEmployerByUserId
{
    public class GetEmployerByUserIdQueryHandler : IRequestHandler<GetEmployerByUserIdQuery, EmployerDto>
    {
        private readonly IEmployerRepository _employerRepository;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;

        public GetEmployerByUserIdQueryHandler(IEmployerRepository employerRepository, IHttpContextInfoAccessor httpContextInfoAccessor)
        {
            _employerRepository = employerRepository;
            _httpContextInfoAccessor = httpContextInfoAccessor;
        }
        public async Task<EmployerDto> Handle(GetEmployerByUserIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "GetEmployerByUserIdQueryHandler", JsonConvert.SerializeObject(request));

                var employer = await _employerRepository.GetEmployerByUserIdForAdminAsync(request.UserId);
                if (employer == null)
                {
                    await LoggerHelper.LogInfomationAsync(ipClient, "GetEmployerByUserIdQueryHandler", $"Khong tim thay employer co UserId {request.UserId}");
                    throw new Entities.Exceptions.UserNotFoundException($"Khong tim thay employer co UserId {request.UserId}");
                }
                await LoggerHelper.LogInfomationAsync(ipClient, "GetEmployerByUserIdQueryHandler", $"Xem thong tin employer co UserId {request.UserId}");
                return employer;

            }
            catch
            {
                throw;
            }
        }
    }
}
