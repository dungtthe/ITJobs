using ITJobs.Entities.Enums;
using ITJobs.UseCases.Helpers.Paginations;
using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.Employers.Queries.GetTopEmployersByApplicationsSummary
{
    public class GetTopEmployersByApplicationsSummaryHandler : IRequestHandler<GetTopEmployersByApplicationsSummaryQuery, PagedResult<EmployerSummaryDto>>
    {
        private readonly IJobApplicationRepository _jobApplicationRepository;
        private readonly IPostRepository _postRepository;
        private readonly IEmployerRepository _employerRepository;

        public GetTopEmployersByApplicationsSummaryHandler(IJobApplicationRepository jobApplicationRepository, IPostRepository postRepository, IEmployerRepository employerRepository)
        {
            _jobApplicationRepository = jobApplicationRepository;
            _postRepository = postRepository;
            _employerRepository = employerRepository;
        }

        public async Task<PagedResult<EmployerSummaryDto>> Handle(GetTopEmployersByApplicationsSummaryQuery request, CancellationToken cancellationToken)
        {
            try
            {

                HashSet<Guid> topEmployerIds = new HashSet<Guid>();

                // danh sách id của bài đăng có nhiều lượt ứng tuyển nhất
                var topPostsByApplications = await _jobApplicationRepository.GetTopPostsByApplicationsCountAsync();

                // id nhà tuyển dụng tương ứng với các bài đăng đó
                if (topPostsByApplications.Any())
                {
                    var employerIdsFromApplications = await _postRepository.GetEmployerIdsByPostIdsAsync(
                        topPostsByApplications.Select(p => p.PostId).ToList());

                    foreach (var employerId in employerIdsFromApplications)
                    {
                        topEmployerIds.Add(employerId);
                    }
                }

                // không đủ số lượng thì lấy danh sách nhà tuyển dụng đăng bài tuyển dụng nhiều nhất
                if (topEmployerIds.Count < request.PageSize * request.PageNumber)
                {
                    var topJobPostingEmployers = await _postRepository.GetTopEmployersByPostTypeAsync(
                        PostType.JobPosting,
                        request.PageSize * request.PageNumber - topEmployerIds.Count);

                    foreach (var employerId in topJobPostingEmployers)
                    {
                        if (!topEmployerIds.Contains(employerId))
                        {
                            topEmployerIds.Add(employerId);
                        }
                    }
                }

                // không đủ số lương thì lấy danh sách nhà tuyển dụng đăng blog nhiều nhất
                if (topEmployerIds.Count < request.PageSize * request.PageNumber)
                {
                    var topBlogPostingEmployers = await _postRepository.GetTopEmployersByPostTypeAsync(
                        PostType.News,
                        request.PageSize * request.PageNumber - topEmployerIds.Count);

                    foreach (var employerId in topBlogPostingEmployers)
                    {
                        if (!topEmployerIds.Contains(employerId))
                        {
                            topEmployerIds.Add(employerId);
                        }
                    }
                }

                // random ahihi
                List<Guid> finalEmployerIds = topEmployerIds.ToList();
                int neededCount = request.PageSize * request.PageNumber - finalEmployerIds.Count;

                if (neededCount > 0)
                {
                    var additionalEmployers = await _employerRepository.GetEmployerIdsExcludingAsync(finalEmployerIds, neededCount);
                    finalEmployerIds.AddRange(additionalEmployers);
                }

                var employerSummaries = new List<EmployerSummaryDto>();
                foreach (var employerId in finalEmployerIds.Skip((request.PageNumber - 1) * request.PageSize).Take(request.PageSize))
                {
                    var employerSummary = await _employerRepository.GetEmployerSummaryByIdAsync(employerId);
                    if (employerSummary != null)
                    {
                        employerSummary.TotalOpenJobs = await _postRepository.CountActiveJobPostsByEmployerIdAsync(employerId);
                        employerSummaries.Add(employerSummary);
                    }
                }

                var result = new PagedResult<EmployerSummaryDto>
                {
                    PageNumber = request.PageNumber,
                    PageSize = request.PageSize,
                    TotalRecords = finalEmployerIds.Count,
                    TotalPages = (int)Math.Ceiling(finalEmployerIds.Count / (double)request.PageSize),
                    Items = employerSummaries
                };

                return result;
            }
            catch
            {
                throw;
            }
        }
    }
}
