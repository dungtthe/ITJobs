using FluentValidation;
using ITJobs.UseCases.Candidates.Accounts.Commands.Register;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.Users.Employers.Commands.CreateEmployer
{

    public class CreateEmployerCommandValidator : AbstractValidator<CreateEmployerCommand>
    {
        public CreateEmployerCommandValidator()
        {
            RuleFor(x => x.UserName)
                .NotEmpty().WithMessage("Tên đăng nhập không được để trống")
                .MinimumLength(4).WithMessage("Tên đăng nhập phải có ít nhất 4 ký tự")
                .MaximumLength(300).WithMessage("Tên đăng nhập không được vượt quá 300 ký tự");

            RuleFor(x => x.FullName)
                .NotEmpty().WithMessage("Họ tên không được để trống")
                .MinimumLength(4).WithMessage("Họ tên phải có ít nhất 4 ký tự")
                .MaximumLength(300).WithMessage("Họ tên không được vượt quá 300 ký tự");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email không được để trống")
                .EmailAddress().WithMessage("Email không đúng định dạng")
                .MaximumLength(500).WithMessage("Email không được vượt quá 500 ký tự");

            //RuleFor(x => x.PhoneNumber)
            //    .NotEmpty().WithMessage("Số điện thoại không được để trống")
            //    .Matches(@"^(0|\+84)[0-9]{9}$").WithMessage("Số điện thoại không đúng định dạng")
            //    .MaximumLength(50).WithMessage("Số điện thoại không được vượt quá 50 ký tự");
        }
    }
}
