using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.JobApplications.Commands.AddJobApplication
{
    public class AddJobApplicationCommand: IRequest<Guid>
    {
        public Guid ?UserId { get; set; } // id user cua candidate
        public Guid PostId { get; set; } 
        public string CVLink { get; set; } 
        public string CoverLetter { get; set; } 
    }
}
