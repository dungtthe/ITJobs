using ITJobs.UseCases.Helpers.Paginations;
using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Shared.Posts.Queries.GetCommentsByPostId;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ITJobsDbContext _dbContext;
        public CommentRepository(ITJobsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<PagedResult<UseCases.Shared.Posts.Queries.GetCommentsByPostId.CommentDto>> GetCommentsByPostId(GetCommentsByPostIdQuery query)
        {
            var totalRecords = await _dbContext.Comments.CountAsync(c => c.PostId == query.PostId);
            var totalPages = (int)Math.Ceiling((double)totalRecords / query.PageSize);

            var items = await _dbContext.Comments
                .Where(c => c.PostId == query.PostId && c.ParrentCommentId == null)
                .OrderByDescending(c => c.CreatedAt)
                .Skip((query.PageNumber - 1) * query.PageSize)
                .Take(query.PageSize)
                .Select(c => new UseCases.Shared.Posts.Queries.GetCommentsByPostId.CommentDto
                {
                    Id = c.Id,
                    PostId = c.PostId,
                    Content = c.IsRevoked ? "Bình luận này đã bị thu hồi" : c.Content,
                    CreatedAt = c.CreatedAt,
                    Reactions = JsonConvert.DeserializeObject<List<Entities.Reaction>>(c.ReactionType_UserId_Ids),

                    SenderId = c.SenderId,
                    SenderFullName = c.Sender.FullName,
                    SenderImage = c.Sender.Image,
                })
                .ToListAsync();
            //tam thoi lam max hierarchy la 2
            foreach (var item in items)
            {
                var subComments = await _dbContext.Comments
                    .Where(c => c.ParrentCommentId!=null && c.ParrentCommentId == item.Id)
                    .OrderByDescending(c => c.CreatedAt)
                    .Select(c => new UseCases.Shared.Posts.Queries.GetCommentsByPostId.CommentDto
                    {
                        Id = c.Id,
                        PostId = c.PostId,
                        Content = c.IsRevoked ? "Bình luận này đã bị thu hồi" : c.Content,
                        CreatedAt = c.CreatedAt,
                        Reactions = JsonConvert.DeserializeObject<List<Entities.Reaction>>(c.ReactionType_UserId_Ids),

                        SenderId = c.SenderId,
                        SenderFullName = c.Sender.FullName,
                        SenderImage = c.Sender.Image,
                    })
                    .ToListAsync();
                item.SubComments.AddRange(subComments);
            }


            return new PagedResult<UseCases.Shared.Posts.Queries.GetCommentsByPostId.CommentDto>
            {
                Items = items,
                TotalRecords = totalRecords,
                TotalPages = totalPages,
                PageNumber = query.PageNumber,
                PageSize = query.PageSize
            };
        }
    }
}
