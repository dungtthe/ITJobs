using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Models
{
    [Table("WorkExperiences")]
    public class WorkExperience:BaseModel
    {
        public long CandidateId { get; set; }
        [ForeignKey(nameof(CandidateId))]
        public virtual Candidate Candidate { get; set; }

        [Required]
        [MaxLength(500)]
        public string JobTitle { get; set; }

        [MaxLength(500)]
        public string CompanyName { get; set; }
        [MaxLength(1000)]
        public string WebsiteUrl { get; set; }//website cty
        public bool IsCurrent { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        [MaxLength(5000)]
        public string Description { get; set; }
    }
}
