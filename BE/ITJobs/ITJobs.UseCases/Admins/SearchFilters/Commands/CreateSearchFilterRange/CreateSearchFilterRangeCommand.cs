using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.SearchFilters.Commands.CreateSearchFilterRange
{
    public class CreateSearchFilterRangeCommand : IRequest<Guid>
    {
        public string Name { get; set; }
        public long Min { get; set; }
        public long Max { get; set; }
    }
}
