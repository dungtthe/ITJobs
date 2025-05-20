using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.SearchFilters.Commands.CreateSearchFilterCheckBox
{
    public class CreateSearchFilterCheckBoxCommand : IRequest<Guid>
    {
        public string Name { get; set; }
        public List<string> Values {  get; set; }
    }
}
