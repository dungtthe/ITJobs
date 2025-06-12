using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateEducation
{
    public class AddOrUpdateEducationCommandValidator:AbstractValidator<AddOrUpdateEducationCommand>
    {
        public AddOrUpdateEducationCommandValidator()
        {
            RuleFor(x => x.Name)
               .NotEmpty().WithMessage("Tên cơ sở giáo dục không được để trống")
               .MaximumLength(500).WithMessage("Tên cơ sở giáo dục không được vượt quá 500 ký tự");

            RuleFor(x => x.WebsiteUrl)
                .MaximumLength(1000).WithMessage("Website không được vượt quá 1000 ký tự");

            RuleFor(x => x.Degree)
                .MaximumLength(500).WithMessage("Tên bằng cấp không được vượt quá 500 ký tự");

            RuleFor(x => x.FieldOfStudy)
                .MaximumLength(500).WithMessage("Tên ngành học không được vượt quá 500 ký tự");

            RuleFor(x => x.StartDate)
                .Must(date => date <= DateTime.Now)
                .WithMessage("Ngày bắt đầu không thể là ngày trong tương lai");

            RuleFor(x => x.GPA)
                .InclusiveBetween(0, 10).WithMessage("GPA phải nằm trong khoảng từ 0 đến 10");
        }
    }
}
