using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.CompanyProfiles.Commands.UpdateSkills
{
    public class UpdateSkillsCommandValidator:AbstractValidator<UpdateSkillsCommand>
    {
        public UpdateSkillsCommandValidator()
        {
            RuleFor(x => x.Skills)
                .Cascade(CascadeMode.Stop)
                .NotNull()
                .WithMessage("Phải có ít nhất 1 phần tử.")
                .Must(x => x.Count > 0)
                .WithMessage("Phải có ít nhất 1 phần tử.");
        }
    }
}
