using ITJobs.Infrastructure.Commons.Helpers;
using ITJobs.UseCases.Interfaces.ExternalServices;
using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Admins.Posts.Queries.GetBlogPostsSummary
{
    public class GetBlogPostsSummaryQueryHandler : IRequestHandler<GetBlogPostsSummaryQuery, List<BlogPostSummaryDto>>
    {
        private readonly IPostRepository _postRepository;
        private readonly IHttpContextInfoAccessor _httpContextInfoAccessor;

        public GetBlogPostsSummaryQueryHandler(IPostRepository postRepository, IHttpContextInfoAccessor httpContextInfoAccessor)
        {
            _postRepository = postRepository;
            _httpContextInfoAccessor = httpContextInfoAccessor;
        }

        public async Task<List<BlogPostSummaryDto>> Handle(GetBlogPostsSummaryQuery request, CancellationToken cancellationToken)
        {
            try
            {
                string ipClient = _httpContextInfoAccessor.GetClientIpV4();
                await LoggerHelper.LogInfomationAsync(ipClient, "GetBlogPostsSummaryQueryHandler", JsonConvert.SerializeObject(request));

                var posts = await _postRepository.GetBlogPostsSummarAsync();

                await LoggerHelper.LogInfomationAsync(ipClient, "GetBlogPostsSummaryQueryHandler", "thành công: " + JsonConvert.SerializeObject(request));

                return posts;
            }
            catch
            {
                throw;
            }
        }
    }
}
