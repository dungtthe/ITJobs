using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace ITJobs.Infrastructure.SqlServer.Models
{
    [Table("Candidates")]
    public class Candidate:BaseModel
    {
        public long UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual AppUser User { get; set; }

        [MaxLength(2000)]
        public string AboutMe { get; set; }
        public string SkillIds { get; set; }
        public string FollowedEmployerIds { get; set; }

        public Candidate()
        {
            SkillIds = "[]";
            FollowedEmployerIds = "[]";
        }
    }
}
