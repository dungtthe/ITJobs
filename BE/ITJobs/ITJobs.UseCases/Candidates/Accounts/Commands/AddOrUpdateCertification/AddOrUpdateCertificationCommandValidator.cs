using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.AddOrUpdateCertification
{
    public class AddOrUpdateCertificationCommandValidator : AbstractValidator<AddOrUpdateCertificationCommand>
    {
        public AddOrUpdateCertificationCommandValidator()
        {
            RuleFor(x => x.Name)
               .NotEmpty().WithMessage("Tên chứng chỉ không được để trống")
               .MaximumLength(500).WithMessage("Tên chứng chỉ không được vượt quá 500 ký tự");

            RuleFor(x => x.WebsiteUrl)
                .MaximumLength(1000).WithMessage("Website không được vượt quá 1000 ký tự");

            RuleFor(x => x.Description)
                .MaximumLength(5000).WithMessage("Mô tả không được vượt quá 5000 ký tự");

            RuleFor(x => x.ReceivedDate)
                .Must(date => date <= DateTime.Now)
                .WithMessage("Ngày nhận chứng chỉ không được lớn hơn ngày hiện tại");
        }
    }
}
