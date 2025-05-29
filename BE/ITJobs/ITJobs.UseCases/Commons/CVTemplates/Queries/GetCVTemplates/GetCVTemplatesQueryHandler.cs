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

namespace ITJobs.UseCases.Commons.CVTemplates.Queries.GetCVTemplates
{
    public class GetCVTemplatesQueryHandler : IRequestHandler<GetCVTemplatesQuery, List<CVTemplateDto>>
    {
        private readonly ICVTemplateRepository _cVTemplateRepository;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;
        public GetCVTemplatesQueryHandler(ICVTemplateRepository cVTemplateRepository, IHttpContextInfoAccessor httpContextInfoAccessor)
        {
            _cVTemplateRepository = cVTemplateRepository;
            _httpContextInfoAccessor = httpContextInfoAccessor;
        }


        public async Task<List<CVTemplateDto>> Handle(GetCVTemplatesQuery request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "GetCVTemplatesQueryHandler", JsonConvert.SerializeObject(request));

                var cVTemplates = await _cVTemplateRepository.GetAllAsync();

                await LoggerHelper.LogInfomationAsync(ipClient, "GetCVTemplatesQueryHandler", "thành công: " + JsonConvert.SerializeObject(request));

                return cVTemplates.Select(x => new CVTemplateDto
                {
                    Id = x.Id,
                    UserId = x.UserId,
                    Content = x.Content,
                    SortOrder = x.SortOrder,
                    AuthorName = x.AuthorName,
                    AuthorImage = x.AuthorImage
                }).ToList(); 
            }
            catch
            {
                throw;
            }
        }
    }
}
