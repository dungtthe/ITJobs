using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.UpdateOverviews
{
    public class UpdateOverviewsCommand : IRequest<Unit>
    {
        public Guid ?UserId { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Gender { get; set; }
        public DateTime ?DateOfBirth { get; set; }
        public List<Entities.SocialMedia> SocialMediaLinks { get; set; }
    }
}
