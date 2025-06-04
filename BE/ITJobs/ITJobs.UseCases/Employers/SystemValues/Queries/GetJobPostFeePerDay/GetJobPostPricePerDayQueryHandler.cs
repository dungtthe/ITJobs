using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.SystemValues.Queries.GetJobPostFeePerDay
{
    public class GetJobPostPricePerDayQueryHandler : IRequestHandler<GetJobPostPricePerDayQuery, int>
    {
        private readonly ISystemValuesRepository _systemValuesRepository;
        public GetJobPostPricePerDayQueryHandler(ISystemValuesRepository systemValuesRepository)
        {
            _systemValuesRepository = systemValuesRepository;
        }
        public async Task<int> Handle(GetJobPostPricePerDayQuery request, CancellationToken cancellationToken)
        {
            return await _systemValuesRepository.GetJobPostPriceFeeDayAsync();
        }
    }
}
