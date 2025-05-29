using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.Users.Employers.Commands.CreateEmployer
{
    public class CreateEmployerCommand:IRequest<Guid>
    {
        public string CompanyName { get; set; }
        public string Email { get; set; }
    }
}
