using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Employers.Queries.GetEmployerSummary
{
    public class EmployerSummaryDto
    {
        public Guid UserId { get; set; }

        public string CompanyName { get; set; }
        public string Image { get; set; }
        public List<string> LocationNames { get; set; }

        //review
        public int TotalReviews { get; set; }
        public int TotalRecommended { get; set; }
        public float AverageRating { get; set; }
       
    }
}
