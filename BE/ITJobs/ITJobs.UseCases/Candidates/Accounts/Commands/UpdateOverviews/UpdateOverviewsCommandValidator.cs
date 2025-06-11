using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.UpdateOverviews
{
    public class UpdateOverviewsCommandValidator:AbstractValidator<UpdateOverviewsCommand>
    {
        public UpdateOverviewsCommandValidator()
        {
            RuleFor(x => x.FullName)
                .NotEmpty().WithMessage("Họ tên không được để trống")
                .MaximumLength(500).WithMessage("Họ tên không được vượt quá 500 ký tự");

            RuleFor(x => x.PhoneNumber)
                .MaximumLength(50).WithMessage("Số điện thoại không được vượt quá 50 ký tự")
                .Matches(@"^(0|\+84)[0-9]{9}$").When(x => !string.IsNullOrEmpty(x.PhoneNumber))
                .WithMessage("Số điện thoại không đúng định dạng");

            RuleFor(x => x.Address)
                .MaximumLength(500).WithMessage("Địa chỉ không được vượt quá 500 ký tự");

            RuleFor(x => x.Gender)
                .MaximumLength(3).WithMessage("Giới tính không được vượt quá 3 ký tự").When(x => !string.IsNullOrEmpty(x.Gender));

            RuleFor(x => x.DateOfBirth)
                .Must(dob => dob < DateTime.Now).When(x=>x.DateOfBirth!=null)
                .WithMessage("Ngày sinh không hợp lệ");
        }
    }
}
