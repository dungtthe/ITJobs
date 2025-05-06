using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.Register
{
    public class RegisterAccountCommandValidator : AbstractValidator<RegisterAccountCommand>
    {
        public RegisterAccountCommandValidator()
        {
            RuleFor(x => x.UserName)
                .NotEmpty().WithMessage("Tên đăng nhập không được để trống")
                .MinimumLength(4).WithMessage("Tên đăng nhập phải có ít nhất 4 ký tự")
                .MaximumLength(300).WithMessage("Tên đăng nhập không được vượt quá 300 ký tự");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Mật khẩu không được để trống")
                .MinimumLength(4).WithMessage("Mật khẩu phải có ít nhất 4 ký tự")
                .MaximumLength(300).WithMessage("Mật khẩu không được vượt quá 300 ký tự");

            RuleFor(x => x.FullName)
                .NotEmpty().WithMessage("Họ tên không được để trống")
                .MinimumLength(4).WithMessage("Họ tên phải có ít nhất 4 ký tự")
                .MaximumLength(300).WithMessage("Họ tên không được vượt quá 300 ký tự");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email không được để trống")
                .EmailAddress().WithMessage("Email không đúng định dạng")
                .MaximumLength(500).WithMessage("Email không được vượt quá 500 ký tự");
        }
    }
}
