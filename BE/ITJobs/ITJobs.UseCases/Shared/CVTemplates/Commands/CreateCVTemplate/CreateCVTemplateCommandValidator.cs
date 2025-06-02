using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.CVTemplates.Commands.CreateCVTemplate
{
    public class CreateCVTemplateCommandValidator: AbstractValidator<CreateCVTemplateCommand>
    {
        public CreateCVTemplateCommandValidator()
        {
            RuleFor(x => x.Content)
                .NotEmpty().WithMessage("Nội dung không được để trống");
        }
    }
}
