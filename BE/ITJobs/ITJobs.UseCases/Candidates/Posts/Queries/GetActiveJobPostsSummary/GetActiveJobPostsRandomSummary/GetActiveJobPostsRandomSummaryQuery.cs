using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary.GetActiveJobPostsRandomSummary
{
    public class GetActiveJobPostsRandomSummaryQuery : IRequest<List<JobPostsSummaryDto>>
    {
        public Guid ?ExcludePostId { get; set; } 
        public int Count { get; set; }
    }
}
