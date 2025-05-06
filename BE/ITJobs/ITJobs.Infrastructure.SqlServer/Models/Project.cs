using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Models
{
    [Table("Projects")]
    public class Project:BaseModel
    {
        public Guid CandidateId { get; set; }
        [ForeignKey(nameof(CandidateId))]
        public virtual Candidate Candidate { get; set; }

        [Required]
        [MaxLength(500)]
        public string Name { get; set; }
        public bool IsOnGoing { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        [MaxLength(5000)]
        public string Description { get; set; }

        [MaxLength(4000)]
        public string WebsiteUrls { get; set; }
        public Project()
        {
            WebsiteUrls = "[]";
        }
    }
}
