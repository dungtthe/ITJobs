using ITJobs.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateProject
{
    public class AddOrUpdateProjectCommand : IRequest<Guid>
    {
        public Guid? UserId { get; set; }
        public Guid? ProjectId { get; set; }

        public string Name { get; set; }
        public bool IsOnGoing { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Description { get; set; }
        public List<Entities.SocialMedia> SocialMediaLinks { get; set; }

        public AddOrUpdateProjectCommand()
        {
            SocialMediaLinks = new List<SocialMedia>();
        }
    }
}
