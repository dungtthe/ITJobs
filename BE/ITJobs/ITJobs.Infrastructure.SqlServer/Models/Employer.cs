using ITJobs.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Models
{
    [Table("Employers")]
    public class Employer:BaseModel
    {
        public Guid UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual AppUser User { get; set; }

        [Required]
        [MaxLength(500)]
        public string CompanyName { get; set; }

        public string GeneralInfo { get; set; }
        public string CompanyIntroduction { get; set; }
        public string Skills { get; set; }
        public string AdditionalInfo { get; set; }
        public string Locations { get; set; }
        public string EmployeeIds { get; set; }//những ứng viên từng, đang làm (để phục vụ cái review cty á)
        public string BlacklistedCandidateIds { get; set; }


        [MaxLength(1000)]
        public string WebsiteUrl { get; set; }

        [MaxLength(1000)]
        public string CompanyType { get; set; }//Startup, Agency, Product,....

        public Employer()
        {
            Locations = "[]";
            Skills = "[]";
            EmployeeIds = "[]";
            BlacklistedCandidateIds = "[]";
            GeneralInfo = "[]";
        }

    }
}
