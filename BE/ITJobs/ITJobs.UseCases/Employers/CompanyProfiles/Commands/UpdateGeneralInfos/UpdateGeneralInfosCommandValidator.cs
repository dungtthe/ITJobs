using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.CompanyProfiles.Commands.UpdateGeneralInfos
{
    public class UpdateGeneralInfosCommandValidator : AbstractValidator<UpdateGeneralInfosCommand>
    {
        public UpdateGeneralInfosCommandValidator()
        {
            RuleFor(x => x.GeneralInfos)
                .Cascade(CascadeMode.Stop)
                .NotNull()
                .WithMessage("Phải có ít nhất 1 phần tử.")
                .Must(x => x.Count > 0)
                .WithMessage("Phải có ít nhất 1 phần tử.");

            RuleForEach(x => x.GeneralInfos).ChildRules(item =>
            {
                item.RuleFor(x => x.Title)
                    .NotEmpty()
                    .WithMessage("Tiêu đề không được để trống.");

                item.RuleFor(x => x.Description)
                    .NotEmpty()
                    .WithMessage("Mô tả không được để trống.");
            });
        }
    }
}
