using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities
{
    public class Candidate:BaseEntity
    {
        public long UserId { get; set; }
        public AppUser User { get; set; }
        public string AboutMe { get; set; }
        public List<Skill> Skills { get; set; }
        public List<Employer> FollowedEmployers { get; set; }
        public List<CV> CVs { get; set; }  
        public List<Certification> Certifications { get; set; } 
        public List<Education> Educations { get; set; }  
        public List<WorkExperience> WorkExperiences { get; set; }
        public List<Project> Projects { get; set; }    
        public List<Award> Awards { get; set; }

    }
}
