using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.SearchFilters.Commands.CreateSearchFilterCheckBox
{
    public class CreateSearchFilterCheckBoxCommandValidator : AbstractValidator<CreateSearchFilterCheckBoxCommand>
    {
        public CreateSearchFilterCheckBoxCommandValidator()
        {
            RuleFor(x => x.Name)
               .NotEmpty().WithMessage("Tên bộ lọc không được để trống")
               .MaximumLength(500).WithMessage("Tên bộ lọc không được vượt quá 500 ký tự");

            RuleFor(x => x.Values)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("Phải có ít nhất 1 giá trị")
                .NotEmpty().WithMessage("Phải có ít nhất 1 giá trị")
                .ForEach(value =>
                {
                    value.NotEmpty().WithMessage("Mỗi giá trị không được để trống")
                         .MaximumLength(100).WithMessage("Từ khóa không được vượt quá 100 ký tự");
                });
        }
    }
}
