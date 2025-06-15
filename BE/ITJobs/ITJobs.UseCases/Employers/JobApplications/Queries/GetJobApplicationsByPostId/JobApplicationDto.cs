using ITJobs.Entities;
using ITJobs.Entities.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.JobApplications.Queries.GetJobApplicationsByPostId
{
    public class JobApplicationDto
    {
        public Guid Id { get; set; }
        public Guid PostId { get; set; }
        public string CVLink { get; set; }
        public string CoverLetter { get; set; }
        public StatusJobApplication StatusJobApplication { get; set; }
        public DateTime CreatedAt { get; set; }


        //candiate
        public Guid UserId { get; set; }
        public string CandidateFullName { get; set; }
        public string CandidateEmail { get; set; }
        public string CandidateImage { get; set; }
    }
}
