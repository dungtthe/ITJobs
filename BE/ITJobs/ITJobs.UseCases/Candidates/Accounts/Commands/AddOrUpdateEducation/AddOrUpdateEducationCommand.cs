using ITJobs.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateEducation
{
    public class AddOrUpdateEducationCommand:IRequest<Guid>
    {
        public Guid ?UserId { get; set; }
        public Guid ?EducationId { get; set; }

        public string Name { get; set; }
        public string WebsiteUrl { get; set; }
        public string Degree { get; set; }
        public string FieldOfStudy { get; set; }
        public DateTime StartDate { get; set; }
        public bool IsCompleted { get; set; }
        public float GPA { get; set; }
    }
}
