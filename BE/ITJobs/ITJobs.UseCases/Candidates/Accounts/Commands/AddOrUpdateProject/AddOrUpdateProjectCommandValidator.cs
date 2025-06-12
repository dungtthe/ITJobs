using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateProject
{

    public class AddOrUpdateProjectCommandValidator : AbstractValidator<AddOrUpdateProjectCommand>
    {
        public AddOrUpdateProjectCommandValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Tên dự án không được để trống")
                .MaximumLength(500).WithMessage("Tên dự án không được vượt quá 500 ký tự");

            RuleFor(x => x.StartDate)
                .Must(date => date <= DateTime.Now)
                .WithMessage("Ngày bắt đầu không thể là ngày trong tương lai");

            RuleFor(x => x.EndDate)
                .Must((command, endDate) =>
                {
                    if (command.IsOnGoing)
                        return true; 
                    return endDate.HasValue && endDate.Value >= command.StartDate;
                })
                .WithMessage("Ngày kết thúc phải sau ngày bắt đầu");

            RuleFor(x => x.Description)
                .MaximumLength(5000).WithMessage("Mô tả không được vượt quá 5000 ký tự");

            RuleFor(x => x)
                .Must(command => !command.IsOnGoing || !command.EndDate.HasValue)
                .WithMessage("Dự án đang diễn ra không được có ngày kết thúc");
        }
    }
}
