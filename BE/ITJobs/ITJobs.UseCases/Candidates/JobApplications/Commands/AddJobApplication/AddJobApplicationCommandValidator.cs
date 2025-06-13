using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.JobApplications.Commands.AddJobApplication
{
    public class AddJobApplicationCommandValidator:AbstractValidator<AddJobApplicationCommand>
    {
        public AddJobApplicationCommandValidator()
        {

            RuleFor(x=>x.CVLink)
                .NotEmpty().WithMessage("CV không được để trống.")
                .MaximumLength(1000).WithMessage("Đường dẫn CV quá dài.");

            RuleFor(x=>x.CoverLetter)
                .NotEmpty().WithMessage("Thư giới thiệu bản thân không được để trống.")
                .MaximumLength(1000).WithMessage("Thư giới thiệu bản thân không quá 2000 kí tự.");
        }
    }
}
