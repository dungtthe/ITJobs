using ITJobs.UseCases.Helpers.Paginations;
using ITJobs.UseCases.Shared.Posts.Queries.GetCommentsByPostId;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.Repositories
{
    public interface ICommentRepository
    {
        Task<PagedResult<UseCases.Shared.Posts.Queries.GetCommentsByPostId.CommentDto>> GetCommentsByPostId(GetCommentsByPostIdQuery query);
    }
}
