using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.DeleteEducation
{
    public class DeleteEducationCommand : IRequest<Unit>
    {
        public Guid? UserId { get; set; }
        public Guid EducationId { get; set; }
    }
}
