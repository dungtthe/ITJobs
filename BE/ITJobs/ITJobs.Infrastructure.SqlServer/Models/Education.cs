using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Models
{
    [Table("Educations")]
    public class Education:BaseModel
    {
        public long CandidateId { get; set; }
        [ForeignKey(nameof(CandidateId))]
        public virtual Candidate Candidate { get; set; }

        [Required]
        [MaxLength(500)]
        public string Name { get; set; }
        [MaxLength(1000)]
        public string WebsiteUrl { get; set; }//website truong hoc
        [MaxLength(500)]
        public string Degree { get; set; }
        [MaxLength(500)]
        public string FieldOfStudy { get; set; }
        public DateTime StartDate { get; set; }
        public bool IsCompleted { get; set; }
        public float GPA { get; set; }
    }
}
