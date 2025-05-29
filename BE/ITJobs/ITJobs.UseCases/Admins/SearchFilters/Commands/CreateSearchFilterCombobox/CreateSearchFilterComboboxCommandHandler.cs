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

namespace ITJobs.UseCases.Admins.SearchFilters.Commands.CreateSearchFilterCombobox
{

    public class CreateSearchFilterComboboxCommandHandler : IRequestHandler<CreateSearchFilterComboboxCommand, Guid>
    {
        private readonly ISearchFilterRepository _searchFilterRepository;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;
        private readonly IUnitOfWork _unitOfWork;


        public CreateSearchFilterComboboxCommandHandler(ISearchFilterRepository searchFilterRepository, IHttpContextInfoAccessor httpContextInfoAccessor, IUnitOfWork unitOfWork)
        {
            _searchFilterRepository = searchFilterRepository;
            _httpContextInfoAccessor = httpContextInfoAccessor;
            _unitOfWork = unitOfWork;
        }

        public async Task<Guid> Handle(CreateSearchFilterComboboxCommand request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "CreateSearchFilterComboboxCommandHandler", JsonConvert.SerializeObject(request));

                await _unitOfWork.BeginTransactionAsync();

                var searchFilterComboboxId = Guid.NewGuid();
                var searchFilterCombobox = new SearchFilterCombobox
                {
                    Id = searchFilterComboboxId,
                    Name = request.Name,
                    Values = request.Values,
                };
                var order = await _searchFilterRepository.GetMaxOrderAsync() + 1;
                searchFilterCombobox.ViewOrder = order;
                searchFilterCombobox.IsCreatedBySystem = false;
                await _searchFilterRepository.AddSearchFilterCheckboxOrComboboxAsync(searchFilterCombobox);

                await _unitOfWork.CommitAsync();

                await LoggerHelper.LogInfomationAsync(ipClient, "CreateSearchFilterComboboxCommandHandler", "Tạo bộ lọc thành công: " + JsonConvert.SerializeObject(searchFilterCombobox));

                return searchFilterComboboxId;
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
