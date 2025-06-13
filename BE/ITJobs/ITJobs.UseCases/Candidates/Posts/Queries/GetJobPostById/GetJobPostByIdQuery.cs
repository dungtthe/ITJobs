using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Posts.Queries.GetJobPostById
{
    public class GetJobPostByIdQuery:IRequest<JobPostDto>
    {
        public Guid PostId { get; set; } 
    }
}
