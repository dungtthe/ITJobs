using ITJobs.UseCases.Helpers.Paginations;
using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.Employers.Queries.GetReviewsByUserId
{
    public class GetReviewsByUserIdQueryHandler : IRequestHandler<GetReviewsByUserIdQuery, PagedResult<ReviewDto>>
    {
        private readonly IReviewRepository _reviewRepository;
        public GetReviewsByUserIdQueryHandler(IReviewRepository reviewRepository)
        {
            _reviewRepository = reviewRepository;
        }
        public async Task<PagedResult<ReviewDto>> Handle(GetReviewsByUserIdQuery request, CancellationToken cancellationToken)
        {
            return await _reviewRepository.GetReviewsByUserIdAsync(request);
        }
    }
}
