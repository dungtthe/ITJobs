using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.Users.Candidates.Queries.GetCandidateSummary
{
    public class CandidateSummaryDto
    {
        public Guid UserId { get; set; }
        public string Image { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsLock { get; set; }
        public List<Entities.SocialMedia> SocialMedias { get; set; }
    }
}
