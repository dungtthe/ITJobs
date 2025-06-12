using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateWorkExperience
{
    public class AddOrUpdateWorkExperienceCommand : IRequest<Guid>
    {
        public Guid? UserId { get; set; }
        public Guid? WorkExperienceId { get; set; }
        public string JobTitle { get; set; }
        public string CompanyName { get; set; }
        public string WebsiteUrl { get; set; }
        public bool IsCurrent { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Description { get; set; }
    }
}
