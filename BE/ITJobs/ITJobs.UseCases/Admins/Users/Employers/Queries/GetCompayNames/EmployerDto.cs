using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.Users.Employers.Queries.GetCompayNames
{
    public class EmployerDto
    {
        public Guid UserId { get; set; }
        public string CompanyName { get; set; }
        public string Image { get; set; }
    }
}
