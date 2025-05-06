using ITJobs.Entities.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Models
{
    [Table("JobApplications")]
    public class JobApplication:BaseModel
    {
        public Guid PostId { get; set; }
        [ForeignKey(nameof(PostId))]
        public virtual Post Post { get; set; }

        public Guid CandidateId { get; set; }
        [ForeignKey(nameof(CandidateId))]
        public virtual Candidate Candidate { get; set; }

        [MaxLength(1000)]
        public string CVLink { get; set; }
        [MaxLength(2000)]
        public string CoverLetter { get; set; }
        public StatusJobApplication StatusJobApplication { get; set; }
        public JobApplication()
        {
            StatusJobApplication = StatusJobApplication.Submitted;
        }
    }
}
