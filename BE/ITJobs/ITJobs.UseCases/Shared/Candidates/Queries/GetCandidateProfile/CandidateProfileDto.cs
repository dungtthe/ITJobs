using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.Candidates.Queries.GetCandidateProfile
{
    public class CandidateProfileDto
    {
        //overview
        public Guid UserId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Gender { get; set; }
        public DateTime ?DateOfBirth { get; set; }
        public string Image { get; set; }
        public List<Entities.SocialMedia> SocialMediaLinks { get; set; }    

        //introduction
        public string AboutMe { get; set; }
        //cv
        public List<Entities.CV> CVs { get; set; }
        public List<string> Skills { get; set; }

        public List<Entities.Education> Educations { get; set; }
    }
}
