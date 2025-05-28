using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.Users.Employers.Queries.GetEmployerByUserId
{
    public class GetEmployerByUserIdQuery : IRequest<EmployerDto>
    {
        public Guid UserId { get; set; }
    }
}
