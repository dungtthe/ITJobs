using ITJobs.Entities.Enums;
using ITJobs.UseCases.Admins.Posts.Queries.GetBlogPostsSummary;
using ITJobs.UseCases.Admins.Posts.Queries.GetJobPostsSummary;
using ITJobs.UseCases.Helpers.Paginations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.Repositories
{
    public interface IPostRepository
    {
        Task AddBlogPostAsync(Guid userId,Entities.Post postEntity);

        #region admin
        Task<PagedResult<Admins.Posts.Queries.GetBlogPostsSummary.BlogPostSummaryDto>> GetBlogPostsSummarForAdminAsync(GetBlogPostsSummaryQuery request);
        Task<PagedResult<Admins.Posts.Queries.GetJobPostsSummary.JobPostSummaryDto>> GetJobPostsSummarForAdminAsync(Admins.Posts.Queries.GetJobPostsSummary.GetJobPostsSummaryQuery request);
        #endregion


        Task<List<Guid>> GetEmployerIdsByPostIdsAsync(List<Guid> postIds);
        Task<List<Guid>> GetTopEmployersByPostTypeAsync(PostType postType, int count);
        Task<int> CountActiveJobPostsByEmployerIdAsync(Guid employerId);

        #region candidate
        Task<PagedResult<ITJobs.UseCases.Candidates.Posts.Queries.GetTopBlogPostsByViewCountSummary.BlogPostSummaryDto>> GetTopBlogPostsByViewCountAsync(int pageNumber, int pageSize);
        #endregion

        #region employer
        Task<Guid> AddJobPostAsync(Guid userId, Entities.Post postEntity);
        #endregion
    }
}
