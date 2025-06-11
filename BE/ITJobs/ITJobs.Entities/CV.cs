using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities
{
    public class CV:BaseEntity
    {
        public Guid CandidateId { get; set; }
        public string OriginalFileName { get; set; }
        public string FileName { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
