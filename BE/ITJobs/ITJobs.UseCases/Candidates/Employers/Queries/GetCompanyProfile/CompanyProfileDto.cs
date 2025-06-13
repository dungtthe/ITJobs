using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Employers.Queries.GetCompanyProfile
{
    public class CompanyProfileDto
    {
        public List<Entities.GeneralInfoItem> GeneralInfo { get; set; }
        public string CompanyIntroduction { get; set; }
        public List<string> Skills { get; set; }
        public List<Entities.Location> Locations { get; set; }
    }
}
