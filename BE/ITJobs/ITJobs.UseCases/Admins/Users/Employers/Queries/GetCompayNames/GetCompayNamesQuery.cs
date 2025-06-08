using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.Users.Employers.Queries.GetCompayNames
{
    public class GetCompayNamesQuery:IRequest<List<EmployerDto>>
    {
    }
}
