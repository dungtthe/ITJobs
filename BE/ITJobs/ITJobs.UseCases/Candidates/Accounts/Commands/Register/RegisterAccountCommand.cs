using ITJobs.UseCases.Commons;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.Register
{
    public class RegisterAccountCommand:IRequest<string>
    {
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
    }
}
