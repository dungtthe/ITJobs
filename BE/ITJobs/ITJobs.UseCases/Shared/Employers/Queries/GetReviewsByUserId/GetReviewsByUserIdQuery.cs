using ITJobs.UseCases.Helpers.Paginations;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.Employers.Queries.GetReviewsByUserId
{
    public class GetReviewsByUserIdQuery : BasePaginationParameters, IRequest<PagedResult<ReviewDto>>
    {
        public Guid UserId { get; set; }//id cua employer
    }
}
