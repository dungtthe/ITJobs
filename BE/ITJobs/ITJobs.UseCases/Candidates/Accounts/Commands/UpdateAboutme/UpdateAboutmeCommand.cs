using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.UpdateAboutme
{
    public class UpdateAboutmeCommand : IRequest<string>
    {
        public Guid? UserId { get; set; }
        public string CandidateAboutme { get; set; }
    }
}
