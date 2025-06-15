using ITJobs.UseCases.Helpers.Paginations;
using ITJobs.UseCases.Interfaces.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.Posts.Queries.GetCommentsByPostId
{
    public class GetCommentsByPostIdQueryHandler : IRequestHandler<GetCommentsByPostIdQuery, PagedResult<CommentDto>>
    {
        private readonly ICommentRepository _commentRepository;
        public GetCommentsByPostIdQueryHandler(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }
        public async Task<PagedResult<CommentDto>> Handle(GetCommentsByPostIdQuery request, CancellationToken cancellationToken)
        {
            return await _commentRepository.GetCommentsByPostId(request);
        }
    }
}
