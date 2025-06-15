using ITJobs.UseCases.Helpers.Paginations;
using ITJobs.UseCases.Shared.Employers.Queries.GetReviewsByUserId;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.Repositories
{
    public interface IReviewRepository
    {
        Task<PagedResult<ReviewDto>> GetReviewsByUserIdAsync(GetReviewsByUserIdQuery request);
    }
}
