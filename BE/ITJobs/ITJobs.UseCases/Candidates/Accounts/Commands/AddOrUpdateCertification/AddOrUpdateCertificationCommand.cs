using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateCertification
{
    public class AddOrUpdateCertificationCommand : IRequest<Guid>
    {
        public Guid? UserId { get; set; }
        public Guid? CertificationId { get; set; }
        public string Name { get; set; }
        public DateTime ReceivedDate { get; set; }
        public List<string> Images { get; set; }
        public string WebsiteUrl { get; set; }
        public string Description { get; set; }

        public AddOrUpdateCertificationCommand()
        {
            Images = new List<string>();
        }
    }
}
