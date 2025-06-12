using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.DeleteAward
{
    public class DeleteAwardCommand : IRequest<Unit>
    {
        public Guid? UserId { get; set; }
        public Guid AwardId { get; set; }
    }
}
