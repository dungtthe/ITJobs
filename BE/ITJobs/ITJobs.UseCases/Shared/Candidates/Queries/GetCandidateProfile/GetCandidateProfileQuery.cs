using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.Candidates.Queries.GetCandidateProfile
{
    public class GetCandidateProfileQuery:IRequest<CandidateProfileDto>
    {
        public Guid? UserId { get; set; }
    }
}
