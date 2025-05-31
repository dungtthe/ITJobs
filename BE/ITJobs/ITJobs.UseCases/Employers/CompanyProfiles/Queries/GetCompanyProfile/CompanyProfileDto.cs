using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.CompanyProfiles.Queries.GetCompanyProfile
{
    public class CompanyProfileDto
    {
        //lay ben bang user
        public Guid UserId { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Image { get; set; } 
        public string AccountBalance { get; set; } 
        public List<Entities.SocialMedia> SocialMediaLinks { get; set; }

        //lay ben bang employer
        public string CompanyName { get; set; }
        public List<Entities.GeneralInfoItem> GeneralInfo { get; set; }
        public string CompanyIntroduction { get; set; }
        public List<string> Skills { get; set; }
        public string AdditionalInfo { get; set; }
        public List<Entities.Location> Locations { get; set; }
        public string WebsiteUrl { get; set; }
        public string CompanyType { get; set; }
    }
}
