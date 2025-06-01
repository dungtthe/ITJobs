using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.CompanyProfiles.Commands.UpdateCompanyOverviews
{
    public class UpdateCompanyOverviewsCommandValidator : AbstractValidator<UpdateCompanyOverviewsCommand>
    {
        public UpdateCompanyOverviewsCommandValidator()
        {
            RuleFor(x => x.CompanyName)
                .NotEmpty()
                .WithMessage("Tên công ty không được để trống.");
            RuleFor(x => x.PhoneNumber)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .WithMessage("Số điện thoại không được để trống.")
            .Matches(@"^(0|\+84)(\d{9})$")
            .WithMessage("Số điện thoại không hợp lệ.");
        }
    }
}
