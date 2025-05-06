using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Models
{
    [Table("Certifications")]
    public class Certification:BaseModel
    {
        public Guid CandidateId { get; set; }
        [ForeignKey(nameof(CandidateId))]
        public virtual Candidate Candidate { get; set; }

        [Required]
        [MaxLength(500)]
        public string Name { get; set; }
        public DateTime ReceivedDate { get; set; }
        [MaxLength(1000)]
        public string Image { get; set; }
        [MaxLength(1000)]
        public string WebsiteUrl { get; set; }//noi cap chung chi
        [MaxLength(5000)]
        public string Description { get; set; }
    }
}
