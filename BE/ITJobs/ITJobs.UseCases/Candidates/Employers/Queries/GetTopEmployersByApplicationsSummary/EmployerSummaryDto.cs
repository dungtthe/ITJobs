using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Employers.Queries.GetTopEmployersByApplicationsSummary
{
    public class EmployerSummaryDto
    {
        public Guid UserId { get; set; }
        public string Image { get; set; }
        public string CompanyName { get; set; }
        public List<string> LocationNames { get; set; }
        public int TotalOpenJobs { get; set; }//số bài đăng còn hạn, hiệu lực
    }
}
