using ITJobs.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Commons.Accounts.Queries.Login
{
    public class UserDto
    {
        public string Name { get; set; }
        public string Image { get; set; }
        public string Token { get; set; }
        public RoleType RoleType { get; set; }
    }
}
