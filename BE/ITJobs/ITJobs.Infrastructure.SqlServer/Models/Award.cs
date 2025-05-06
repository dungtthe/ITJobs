using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Models
{
    [Table("Awards")]
    public class Award:BaseModel
    {
        public Guid CandidateId { get; set; }
        [ForeignKey(nameof(CandidateId))]
        public virtual Candidate Candidate { get; set; }

        [Required]
        [MaxLength(500)]
        public string Name { get; set; }

        [MaxLength(1000)]
        public string Organization { get; set; }
        public DateTime ReceivedDate { get; set; }

        [MaxLength(5000)]
        public string Description { get; set; }

        [MaxLength(1000)]
        public string WebsiteUrl { get; set; }//website noi cap giai thuong
    }
}
