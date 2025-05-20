using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.SearchFilters.Commands.CreateSearchFilterRange
{
    public class CreateSearchFilterRangeCommandValidator : AbstractValidator<CreateSearchFilterRangeCommand>
    {
        public CreateSearchFilterRangeCommandValidator()
        {
            RuleFor(x => x.Name)
               .NotEmpty().WithMessage("Tên bộ lọc không được để trống")
               .MaximumLength(500).WithMessage("Tên bộ lọc không được vượt quá 500 ký tự");

            RuleFor(x => x.Min)
                .GreaterThanOrEqualTo(long.MinValue).WithMessage($"Giá trị Min phải lớn hơn hoặc bằng {long.MinValue}")
                .LessThanOrEqualTo(long.MaxValue).WithMessage($"Giá trị Min phải nhỏ hơn hoặc bằng {long.MaxValue}");

            RuleFor(x => x.Max)
                .GreaterThanOrEqualTo(long.MinValue).WithMessage($"Giá trị Max phải lớn hơn hoặc bằng {long.MinValue}")
                .LessThanOrEqualTo(long.MaxValue).WithMessage($"Giá trị Max phải nhỏ hơn hoặc bằng {long.MaxValue}")
                .GreaterThan(x => x.Min).WithMessage("Giá trị Max phải lớn hơn giá trị Min");
        }
    }
}
