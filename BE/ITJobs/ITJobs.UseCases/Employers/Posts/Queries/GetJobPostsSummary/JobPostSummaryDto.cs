using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.Posts.Queries.GetJobPostsSummary
{
    public class JobPostSummaryDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime EndDate { get; set; }
        public long ViewCount { get; set; }
        public string PostingFee { get; set; }
        public int JobApplicationCount { get; set; }
    }
}
