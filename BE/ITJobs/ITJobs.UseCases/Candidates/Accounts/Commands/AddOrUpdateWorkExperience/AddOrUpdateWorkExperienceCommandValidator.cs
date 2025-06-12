using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateWorkExperience
{
    public class AddOrUpdateWorkExperienceCommandValidator : AbstractValidator<AddOrUpdateWorkExperienceCommand>
    {
        public AddOrUpdateWorkExperienceCommandValidator()
        {
            RuleFor(x => x.JobTitle)
               .NotEmpty().WithMessage("Chức vụ không được để trống")
               .MaximumLength(500).WithMessage("Chức vụ  không được vượt quá 500 ký tự");

            RuleFor(x => x.CompanyName)
                .MaximumLength(500).WithMessage("Tên công ty không được vượt quá 500 ký tự");

            RuleFor(x => x.WebsiteUrl)
                .MaximumLength(1000).WithMessage("Website không được vượt quá 1000 ký tự");

            RuleFor(x => x.StartDate)
                .Must(date => date <= DateTime.Now)
                .WithMessage("Ngày bắt đầu không được trong tương lai");

            RuleFor(x => x.EndDate)
                .Must((command, endDate) => !endDate.HasValue || endDate.Value >= command.StartDate)
                .WithMessage("Ngày kết thúc phải sau ngày bắt đầu");

            RuleFor(x => x.Description)
                .MaximumLength(5000).WithMessage("Mô tả không được vượt quá 5000 ký tự");
        }
    }
}
