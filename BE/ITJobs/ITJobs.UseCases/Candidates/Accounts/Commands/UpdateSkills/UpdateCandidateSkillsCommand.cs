using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.UpdateSkills
{
    public class UpdateCandidateSkillsCommand : IRequest<Unit>
    {
        public Guid? UserId { get; set; }
        public List<string> Skills { get; set; }
    }
}
