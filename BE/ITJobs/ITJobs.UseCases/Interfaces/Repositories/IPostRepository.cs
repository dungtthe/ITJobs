using ITJobs.Entities.Enums;
using ITJobs.UseCases.Admins.Posts.Queries.GetBlogPostsSummary;
using ITJobs.UseCases.Admins.Posts.Queries.GetJobPostsSummary;
using ITJobs.UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary;
using ITJobs.UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary.GetActiveJobPostsSummaryBySearchFilters;
using ITJobs.UseCases.Candidates.Posts.Queries.GetBlogPostById;
using ITJobs.UseCases.Candidates.Posts.Queries.GetRandomBlogPostsSummary;
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
        Task<PagedResult<Candidates.Posts.Queries.GetBlogPostsSummary.BlogPostSummaryDto>> GetBlogPostsSummaryForCandidateAsync(Candidates.Posts.Queries.GetBlogPostsSummary.GetBlogPostsSummaryQuery request);
        Task<List<Candidates.Posts.Queries.GetRandomBlogPostsSummary.BlogPostSummaryDto>> GetRandomBlogPostsSummaryForCandidateAsync(GetRandomBlogPostsSummaryQuery request);
        Task<ITJobs.UseCases.Candidates.Posts.Queries.GetBlogPostById.BlogPostDto> GetBlogPostByIdForCandidate(ITJobs.UseCases.Candidates.Posts.Queries.GetBlogPostById.GetBlogPostByIdQuery request);
        Task<List<UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary.JobPostsSummaryDto>> GetActiveJobPostsSummaryByUserIdForCandidateAsync(Guid userId);
        Task <UseCases.Candidates.Posts.Queries.GetJobPostById.JobPostDto> GetJobPostByIdForCandidateAsync(Guid postId);
        Task<List<UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary.JobPostsSummaryDto>> GetActiveJobPostsSummaryRandomForCandidateAsync(Guid? excludePostId, int count);
        
        Task<PagedResult<UseCases.Candidates.Posts.Queries.GetActiveJobPostsSummary.JobPostsSummaryDto>> GetActiveJobPostsSummaryBySearchFiltersForCandidateAsync(GetActiveJobPostsSummaryBySearchFiltersQuery request);
        #endregion

        #region employer
        Task<Guid> AddJobPostAsync(Guid userId, Entities.Post postEntity);
        Task<PagedResult<Employers.Posts.Queries.GetJobPostsSummary.JobPostSummaryDto>> GetJobPostsSummaryForEmployerAsync(Employers.Posts.Queries.GetJobPostsSummary.GetJobPostsSummaryQuery request);
        Task<bool> IsPostOwnedByEmployerAsync(Guid postId, Guid userId);
        Task UpdateJobPostAsync(Guid postId, string title, string content);
        Task<UseCases.Employers.Posts.Queries.GetJobPostById.JobPostDto> GetJobPostByIdAsync(Guid postId);
        #endregion


    }
}
