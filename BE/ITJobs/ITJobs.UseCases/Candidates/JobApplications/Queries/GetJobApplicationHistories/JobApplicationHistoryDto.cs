using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.JobApplications.Queries.GetJobApplicationHistories
{
    public class JobApplicationHistoryDto
    {
        public Guid JobApplicationId { get; set; }
        public Guid PostId { get; set; }
        public string PostTitle { get; set; } 

        //employer
        public Guid EmpoyerUserId { get; set; }
        public string CompanyName { get; set; }
        public string EmployerImage { get; set; }

        public string CoverLetter { get; set; }
        public string CVLink { get; set; }
        public DateTime CreatedAt { get; set; }
        public Entities.Enums.StatusJobApplication StatusJobApplication { get; set; }
    }
}
