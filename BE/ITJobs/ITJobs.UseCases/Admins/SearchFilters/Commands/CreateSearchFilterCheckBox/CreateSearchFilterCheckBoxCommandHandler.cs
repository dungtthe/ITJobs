using ITJobs.Entities;
using ITJobs.Infrastructure.Commons.Helpers;
using ITJobs.UseCases.Admins.SearchFilters.Commands.CreateSearchFilterCheckBox;
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

namespace ITJobs.UseCases.Admins.SearchFilters.Commands.CreateSearchFilterCheckBox
{
    public class CreateSearchFilterCheckBoxCommandHandler : IRequestHandler<CreateSearchFilterCheckBoxCommand, Guid>
    {
        private readonly ISearchFilterRepository _searchFilterRepository;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;
        private readonly IUnitOfWork _unitOfWork;


        public CreateSearchFilterCheckBoxCommandHandler(ISearchFilterRepository searchFilterRepository, IHttpContextInfoAccessor httpContextInfoAccessor, IUnitOfWork unitOfWork)
        {
            _searchFilterRepository = searchFilterRepository;
            _httpContextInfoAccessor = httpContextInfoAccessor;
            _unitOfWork = unitOfWork;
        }

        public async Task<Guid> Handle(CreateSearchFilterCheckBoxCommand request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "CreateSearchFilterCheckBoxCommandHandler", JsonConvert.SerializeObject(request));

                await _unitOfWork.BeginTransactionAsync();

                var searchFilterCheckBoxId = Guid.NewGuid();
                var searchFilterCheckBox = new SearchFilterCheckBox
                {
                    Id = searchFilterCheckBoxId,
                    Name = request.Name,
                    Values = request.Values,
                };

                await _searchFilterRepository.AddSearchFilterCheckboxOrComboboxAsync(searchFilterCheckBox);

                await _unitOfWork.CommitAsync();

                await LoggerHelper.LogInfomationAsync(ipClient, "CreateSearchFilterCheckBoxCommandHandler", "Tạo bộ lọc thành công: " + JsonConvert.SerializeObject(searchFilterCheckBox));

                return searchFilterCheckBoxId;
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
