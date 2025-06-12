using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.DeleteProject
{
    public class DeleteProjectCommand : IRequest<Unit>
    {
        public Guid? UserId { get; set; }
        public Guid ProjectId { get; set; }
    }
}
