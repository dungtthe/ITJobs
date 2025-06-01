using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.CompanyProfiles.Commands.UpdateLocations
{
    public class UpdateLocationsCommandValidator: AbstractValidator<UpdateLocationsCommand>
    {
        public UpdateLocationsCommandValidator()
        {
            RuleFor(x => x.Locations)
                .Cascade(CascadeMode.Stop)
                .NotNull()
                .WithMessage("Phải có ít nhất 1 phần tử.")
                .Must(x => x.Count > 0)
                .WithMessage("Phải có ít nhất 1 phần tử.");

            RuleForEach(x => x.Locations).ChildRules(item =>
            {
                item.RuleFor(x => x.PlaceName)
                    .NotEmpty()
                    .WithMessage("Tên địa điểm không được để trống.");

                item.RuleFor(x => x.Address)
                    .NotEmpty()
                    .WithMessage("Địa chỉ không được để trống.");
            });
        }
    }
}
