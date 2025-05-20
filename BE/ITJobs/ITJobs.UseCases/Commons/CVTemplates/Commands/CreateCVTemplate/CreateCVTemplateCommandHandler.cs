using ITJobs.Entities;
using ITJobs.Infrastructure.Commons.Helpers;
using ITJobs.UseCases.Admins.Posts.Commands.CreateBlogPost;
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

namespace ITJobs.UseCases.Commons.CVTemplates.Commands.CreateCVTemplate
{
    public class CreateCVTemplateCommandHandler : IRequestHandler<CreateCVTemplateCommand, Guid>
    {
        private readonly ICVTemplateRepository _cVTemplateRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;
        public CreateCVTemplateCommandHandler(ICVTemplateRepository cVTemplateRepository, IUnitOfWork unitOfWork, IHttpContextInfoAccessor httpContextInfoAccessor)
        {
            _cVTemplateRepository = cVTemplateRepository;
            _unitOfWork = unitOfWork;
            _httpContextInfoAccessor = httpContextInfoAccessor;
        }

        public async Task<Guid> Handle(CreateCVTemplateCommand request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "CreateCVTemplateCommandHandler", JsonConvert.SerializeObject(request));


                var cvtemplates = await _cVTemplateRepository.GetAllAsync();
                int maxSortOrder = cvtemplates.Any() ? cvtemplates.Max(x => x.SortOrder) : 0;

                var id = Guid.NewGuid();
                var cVTemplate = new Entities.CVTemplate
                {
                    Id = id,
                    UserId = request.UserId,
                    Content = request.Content,
                    SortOrder= maxSortOrder+1
                };
                await _unitOfWork.BeginTransactionAsync();
                await _cVTemplateRepository.AddAsync(cVTemplate);
                await _unitOfWork.CommitAsync();

                await LoggerHelper.LogInfomationAsync(ipClient, "CreateCVTemplateCommandHandler", "thành công: " + JsonConvert.SerializeObject(request));
                return id;

            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
