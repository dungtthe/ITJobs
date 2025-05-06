using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities
{
    public class Employer:BaseEntity
    {
        public Guid UserId { get; set; }
        public AppUser User { get; set; }
        public string CompanyName { get; set; }
        public string GeneralInfo { get; set; }
        public string CompanyIntroduction { get; set; }
        public List<Skill> Skills { get; set; }
        public string AdditionalInfo { get; set; }
        public List<Location> Locations { get; set; }
        public List<Candidate> Employees { get; set; }  //người đang làm, đã từng làm ở công ty, dùng cho mục đích đánh giá
        public List<Candidate> BlacklistedCandidates { get; set; }
        public List<Review> Reviews { get; set; }
    }
}
