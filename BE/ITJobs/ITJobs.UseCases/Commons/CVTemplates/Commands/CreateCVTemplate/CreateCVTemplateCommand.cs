using ITJobs.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Commons.CVTemplates.Commands.CreateCVTemplate
{
    public class CreateCVTemplateCommand : IRequest<Guid>
    {
        public Guid UserId { get; set; }
        public string Content { get; set; }
    }
}
