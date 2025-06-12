using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateAward
{
    public class AddOrUpdateAwardCommand : IRequest<Guid>
    {
        public Guid? UserId { get; set; }
        public Guid? AwardId { get; set; }

        public string Name { get; set; }
        public string Organization { get; set; }
        public DateTime ReceivedDate { get; set; }
        public string Description { get; set; }
        public string WebsiteUrl { get; set; }
    }
}
