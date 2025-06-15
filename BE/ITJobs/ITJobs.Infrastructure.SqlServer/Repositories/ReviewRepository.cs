using ITJobs.UseCases.Helpers.Paginations;
using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Shared.Employers.Queries.GetReviewsByUserId;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly ITJobsDbContext _dbContext;
        public ReviewRepository(ITJobsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<PagedResult<ReviewDto>> GetReviewsByUserIdAsync(GetReviewsByUserIdQuery request)
        {
            var fEmployer = await _dbContext.Employers.FirstOrDefaultAsync(e=>e.UserId==request.UserId);
            if (fEmployer == null)
            {
                throw new Entities.Exceptions.UserNotFoundException();
            }

            var totalRecords = await _dbContext.Reviews.CountAsync(r => r.EmployerId == fEmployer.Id && !r.IsDelete);
            var totalPages = (int)Math.Ceiling((double)totalRecords / request.PageSize);

            var items = await _dbContext.Reviews
                .Where(r => r.EmployerId == fEmployer.Id && !r.IsDelete)
                .OrderByDescending(r => r.CreateAt)
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(r => new ReviewDto
                {
                    Id = r.Id,
                    Title=r.Title,
                    Description = r.Description,
                    RatingType = r.RatingType,
                    IsRecommend = r.IsRecommend,
                    CreatedAt = r.CreateAt,

                    SenderId = r.Candidate.UserId,
                    SenderFullName = r.Candidate.User.FullName,
                    SenderImage = r.Candidate.User.Image,

                })
                .ToListAsync();
            return new PagedResult<ReviewDto>
            {
                Items = items,
                TotalRecords = totalRecords,
                TotalPages = totalPages,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize
            };
        }
    }
}
