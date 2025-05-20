using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.SearchFilters.Commands.CreateSearchFilterCombobox
{
    public class CreateSearchFilterComboboxCommand : IRequest<Guid>
    {
        public string Name { get; set; }
        public List<string> Values { get; set; }
    }
}
