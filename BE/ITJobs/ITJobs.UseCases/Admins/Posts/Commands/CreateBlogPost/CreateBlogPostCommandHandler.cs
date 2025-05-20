using ITJobs.Entities.Enums;
using ITJobs.Entities;
using ITJobs.Infrastructure.Commons.Helpers;
using ITJobs.UseCases.Interfaces.ExternalServices;
using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.Posts.Commands.CreateBlogPost
{
    public class CreateBlogPostCommandHandler : IRequestHandler<CreateBlogPostCommand, Guid>
    {
        private readonly IPostRepository _postRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;
        private readonly IAppUserRepository _appUserRepository;

        public CreateBlogPostCommandHandler(IPostRepository postRepository, IUnitOfWork unitOfWork, IHttpContextInfoAccessor httpContextInfoAccessor)
        {
            _postRepository = postRepository;
            _unitOfWork = unitOfWork;
            _httpContextInfoAccessor = httpContextInfoAccessor;
        }

        public async Task<Guid> Handle(CreateBlogPostCommand request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "CreateBlogPostCommandHandler", JsonConvert.SerializeObject(request));


                await _unitOfWork.BeginTransactionAsync();

                var postId = Guid.NewGuid();
                var post = new Post
                {
                    Id = postId,
                    Title = request.Title,
                    ShortContent = request.ShortContent,
                    Content = request.Content,
                    KeyWords = request.Keywords != null ? request.Keywords:new List<string>(),
                    MainImage=request.MainImage,
                    CreateAt = DateTime.Now,
                    UpdateAt = DateTime.Now,
                    PostType = PostType.News,
                    IsDeleted = false,
                    ViewCount = 0
                };

                await _postRepository.AddBlogPostAsync(request.UserId,post);

                await _unitOfWork.CommitAsync();

                await LoggerHelper.LogInfomationAsync(ipClient, "CreateBlogPostCommandHandler", "Tao bai dang tin tuc thanh cong: " + JsonConvert.SerializeObject(post));

                return postId;
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
