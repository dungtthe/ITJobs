using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.Posts.Commands.CreateBlogPost
{
    public class CreateBlogPostCommandValidator : AbstractValidator<CreateBlogPostCommand>
    {
        public CreateBlogPostCommandValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Tiêu đề không được để trống")
                .MaximumLength(500).WithMessage("Tiêu đề không được vượt quá 500 ký tự");

            RuleFor(x => x.ShortContent)
                .NotEmpty().WithMessage("Tóm tắt không được để trống")
                .MaximumLength(2000).WithMessage("Tóm tắt không được vượt quá 2000 ký tự");

            RuleFor(x => x.Content)
                .NotEmpty().WithMessage("Nội dung không được để trống");

            RuleFor(x => x.MainImage)
               .NotEmpty().WithMessage("Phải có hình ảnh chính");

            RuleFor(x => x.Keywords)
                .Cascade(CascadeMode.Stop)//dung kiem tra khi gap vi pham
                .Must(keywords => keywords == null || keywords.Count <= 10)
                .WithMessage("Danh sách từ khóa không được vượt quá 10 từ khóa")
                .ForEach(keyword =>
                {
                    keyword.NotEmpty().WithMessage("Từ khóa không được để trống")
                           .MaximumLength(30).WithMessage("Từ khóa không được vượt quá 30 ký tự");
                })
                .When(x => x.Keywords != null);
        }
    }
}
