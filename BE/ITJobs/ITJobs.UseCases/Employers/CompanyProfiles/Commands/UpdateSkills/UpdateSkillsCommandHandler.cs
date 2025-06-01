using ITJobs.Entities.Exceptions;
using ITJobs.Infrastructure.Commons.Helpers;
using ITJobs.UseCases.Interfaces.ExternalServices;
using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.CompanyProfiles.Commands.UpdateSkills
{
    public class UpdateSkillsCommandHandler : IRequestHandler<UpdateSkillsCommand, Unit>
    {
        private readonly IEmployerRepository _employerRepository;
        private readonly ISearchFilterRepository _searchFilterRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;
        public UpdateSkillsCommandHandler(IEmployerRepository employerRepository, ISearchFilterRepository searchFilterRepository, IUnitOfWork unitOfWork, IHttpContextInfoAccessor httpContextInfoAccessor)
        {
            _employerRepository = employerRepository;
            _searchFilterRepository = searchFilterRepository;
            _unitOfWork = unitOfWork;
            _httpContextInfoAccessor = httpContextInfoAccessor;
        }
        public async Task<Unit> Handle(UpdateSkillsCommand request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "UpdateGeneralInfosCommandHandler", JsonConvert.SerializeObject(request));
                var skillsInSystem = await _searchFilterRepository.GetSkillsInSystem();
                if (skillsInSystem == null)
                {
                    await LoggerHelper.LogInfomationAsync(ipClient, "UpdateGeneralInfosCommandHandler", "Cập nhật kỹ năng thất bại không tìm thấy skills trong hệ thống: " + JsonConvert.SerializeObject(request));
                    throw new SystemDataNotImplementedException("Chưa seed dữ liệu cho skills ở searchfilter");
                }

                foreach(var skillRequest in request.Skills)
                {
                    if (!skillsInSystem.Contains(skillRequest))
                    {
                        await LoggerHelper.LogInfomationAsync(ipClient, "UpdateGeneralInfosCommandHandler", "Cập nhật kỹ năng thất bại không tìm thấy kỹ năng trong hệ thống: " + JsonConvert.SerializeObject(skillRequest));
                        throw new InvalidSkillException($"Kỹ năng '{skillRequest}' không tồn tại trong hệ thống.");
                    }
                }
                await _unitOfWork.BeginTransactionAsync();
                var result = await _employerRepository.UpdateSkillAsync(request.UserId.Value, request.Skills);
                
                if(!result)
                {
                    await LoggerHelper.LogInfomationAsync(ipClient, "UpdateGeneralInfosCommandHandler", "Cập nhật kỹ năng thất bại không tìm thấy user: " + JsonConvert.SerializeObject(request));
                    throw new UserNotFoundException();
                }
                await _unitOfWork.CommitAsync();

                await LoggerHelper.LogInfomationAsync(ipClient, "UpdateGeneralInfosCommandHandler", "Cập nhật kỹ năng thành công: " + JsonConvert.SerializeObject(request));
                return Unit.Value;
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
