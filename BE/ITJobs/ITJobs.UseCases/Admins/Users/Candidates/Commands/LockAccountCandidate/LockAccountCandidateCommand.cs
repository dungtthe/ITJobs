using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.Users.Candidates.Commands.LockAccountCandidate
{
    public class LockAccountCandidateCommand : IRequest<string>
    {
        public Guid UserId { get; set; }
    }
}
