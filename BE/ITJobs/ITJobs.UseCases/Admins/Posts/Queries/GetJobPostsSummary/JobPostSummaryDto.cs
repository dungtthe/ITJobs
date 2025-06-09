using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.Posts.Queries.GetJobPostsSummary
{
    public class JobPostSummaryDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public DateTime EndDate { get; set; }
        public long ViewCount { get; set; }
        public bool IsDeleted { get; set; }
        public string PostingFee { get; set; }
        public int JobApplicationCount { get; set; }

        //author
        public Guid UserId { get; set; }
        public string AuthorName { get; set; }
        public string AuthorAvatar { get; set; }
    }
}
