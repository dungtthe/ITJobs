using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary
{
    public class JobPostsSummaryDto
    {

        //employer
        public Guid UserId { get; set; }
        public string CompanyName { get; set; }
        public string Image { get; set; }


        //job post
        public Guid PostId { get; set; }
        public string Title { get; set; }
        public DateTime CreateAt { get; set; }
        public List<string> WorkTypes { get; set; }
        public List<string> LocationNames { get; set; }
        public List<string> Skills { get; set; }

        public JobPostsSummaryDto()
        {
            WorkTypes = new List<string>();
            LocationNames = new List<string>();
            Skills = new List<string>();
        }
    }
}
