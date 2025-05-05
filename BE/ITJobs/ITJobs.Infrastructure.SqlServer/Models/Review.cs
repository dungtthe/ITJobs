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
    [Table("Reviews")]
    public class Review:BaseModel
    {

        public long EmployerId { get; set; }
        [ForeignKey(nameof(EmployerId))]
        public virtual Employer Employer { get; set; }

        public long CandidateId { get; set; }
        [ForeignKey(nameof(CandidateId))]
        public virtual Candidate Candidate { get; set; }

        [MaxLength(1000)]
        public string Title { get; set; }
        public RatingType RatingType { get; set; }
        public bool IsRecommend { get; set; }

        [MaxLength(5000)]
        public string Description { get; set; }
        public DateTime CreateAt { get; set; }
        public bool IsDelete { get; set; }
    }
}
