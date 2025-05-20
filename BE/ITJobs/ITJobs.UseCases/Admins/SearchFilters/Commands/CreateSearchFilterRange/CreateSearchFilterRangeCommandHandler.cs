using ITJobs.Entities;
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

namespace ITJobs.UseCases.Admins.SearchFilters.Commands.CreateSearchFilterRange
{
    public class CreateSearchFilterRangeCommandHandler : IRequestHandler<CreateSearchFilterRangeCommand, Guid>
    {
        private readonly ISearchFilterRepository _searchFilterRepository;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;
        private readonly IUnitOfWork _unitOfWork;


        public CreateSearchFilterRangeCommandHandler(ISearchFilterRepository searchFilterRepository, IHttpContextInfoAccessor httpContextInfoAccessor, IUnitOfWork unitOfWork)
        {
            _searchFilterRepository = searchFilterRepository;
            _httpContextInfoAccessor = httpContextInfoAccessor;
            _unitOfWork = unitOfWork;
        }

        public async Task<Guid> Handle(CreateSearchFilterRangeCommand request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "CreateSearchFilterRangeCommandHandler", JsonConvert.SerializeObject(request));

                await _unitOfWork.BeginTransactionAsync();

                var searchFilterRangeId = Guid.NewGuid();
                var searchFilterRange = new SearchFilterRange
                {
                    Id = searchFilterRangeId,
                    Name = request.Name,
                    Min = request.Min,
                    Max = request.Max,
                };

                await _searchFilterRepository.AddSearchFilterRangeAsync(searchFilterRange);

                await _unitOfWork.CommitAsync();

                await LoggerHelper.LogInfomationAsync(ipClient, "CreateSearchFilterRangeCommandHandler", "Tạo bộ lọc thành công: " + JsonConvert.SerializeObject(searchFilterRange));

                return searchFilterRangeId;
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
