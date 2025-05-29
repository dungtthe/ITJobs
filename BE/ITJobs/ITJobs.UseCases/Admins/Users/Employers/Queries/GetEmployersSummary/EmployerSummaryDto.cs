using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.Users.Employers.Queries.GetEmployersSummary
{
    public class EmployerSummaryDto
    {
        public Guid UserId { get; set; }
        public string Image { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string AccountBalance { get; set; }
        public bool IsLock { get; set; }
    }
}
