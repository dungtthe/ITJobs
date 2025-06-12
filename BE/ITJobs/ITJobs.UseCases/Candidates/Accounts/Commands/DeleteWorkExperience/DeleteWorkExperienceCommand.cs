using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.DeleteWorkExperience
{
    public class DeleteWorkExperienceCommand : IRequest<Unit>
    {
        public Guid? UserId { get; set; }
        public Guid WorkExperienceId { get; set; }
    }
}
