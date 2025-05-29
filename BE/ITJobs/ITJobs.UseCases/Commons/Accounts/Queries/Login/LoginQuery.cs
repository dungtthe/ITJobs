using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Commons.Accounts.Queries.Login
{
    public class LoginQuery : IRequest<UserDto>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
