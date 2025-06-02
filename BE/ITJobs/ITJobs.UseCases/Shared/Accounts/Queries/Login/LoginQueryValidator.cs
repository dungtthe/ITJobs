using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.Accounts.Queries.Login
{
    public class LoginQueryValidator : AbstractValidator<LoginQuery>
    {
        public LoginQueryValidator()
        {
            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Mật khẩu không được để trống");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email không được để trống");
        }
    }
}
