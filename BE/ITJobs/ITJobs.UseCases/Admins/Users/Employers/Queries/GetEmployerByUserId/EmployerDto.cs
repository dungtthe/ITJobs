using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.Users.Employers.Queries.GetEmployerByUserId
{
    public class EmployerDto
    {
        //in user
        public Guid UserId { get; set; }
        public string Image { get; set; }
        public string Email { get; set; }
        public string AccountBalance { get; set; }
        public bool IsLocked { get; set; }
        public string PhoneNumber { get; set; }
        public List<Entities.SocialMedia> SocialMediaLinks { get; set; }


        //in employer
        public string CompanyName { get; set; }
        public List<Entities.GeneralInfoItem> GeneralInfo { get; set; }
        public string CompanyIntroduction { get; set; }
        public List<string> Skills { get; set; }
        public string AdditionalInfo { get; set; }
        public List<Entities.Location> Locations { get; set; }
        public string WebsiteUrl { get; set; }
        public string CompanyType { get; set; }
        public int PostedJobCount { get; set; }
        public int PostedBlogCount { get; set; }

    }
}
