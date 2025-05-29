using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.Users.Candidates.Queries.GetCandidateSummary
{
    public class GetCandidateSummaryQuery : IRequest<List<CandidateSummaryDto>>
    {
    }
}
