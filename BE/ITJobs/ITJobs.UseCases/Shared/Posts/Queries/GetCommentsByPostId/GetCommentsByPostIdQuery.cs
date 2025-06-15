using ITJobs.UseCases.Helpers.Paginations;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.Posts.Queries.GetCommentsByPostId
{
    public class GetCommentsByPostIdQuery : BasePaginationParameters, IRequest<PagedResult<CommentDto>>
    {
        public Guid PostId { get; set; }
    }
}
