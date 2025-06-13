using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.Posts.Commands.UpdateJobPost
{
    public class UpdateJobPostCommandValidator:AbstractValidator<UpdateJobPostCommand>
    {
        public UpdateJobPostCommandValidator()
        {
            RuleFor(x => x.Title)
               .NotEmpty().WithMessage("Tiêu đề không được để trống")
               .MaximumLength(500).WithMessage("Tiêu đề không được vượt quá 500 ký tự");

            RuleFor(x => x.Content)
                .NotEmpty().WithMessage("Nội dung không được để trống");
        }
    }
}
