using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateAward
{
    public class AddOrUpdateAwardCommandValidator : AbstractValidator<AddOrUpdateAwardCommand>
    {
        public AddOrUpdateAwardCommandValidator()
        {
            RuleFor(x => x.Name)
               .NotEmpty().WithMessage("Tên giải thưởng không được để trống")
               .MaximumLength(500).WithMessage("Tên giải thưởng không được vượt quá 500 ký tự");

            RuleFor(x => x.Organization)
                .MaximumLength(1000).WithMessage("Tên tổ chức không được vượt quá 1000 ký tự");

            RuleFor(x => x.Description)
                .MaximumLength(5000).WithMessage("Mô tả không được vượt quá 5000 ký tự");

            RuleFor(x => x.WebsiteUrl)
                .MaximumLength(1000).WithMessage("Website không được vượt quá 1000 ký tự");

            RuleFor(x => x.ReceivedDate)
                .Must(date => date <= DateTime.Now)
                .WithMessage("Ngày nhận giải thưởng không thể là ngày trong tương lai");
        }
    }
}
