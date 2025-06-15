using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.Posts.Queries.GetCommentsByPostId
{
    public class CommentDto
    {
        public Guid Id { get; set; }
        public Guid PostId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<Entities.Reaction> Reactions { get; set; }
        //sender
        public Guid SenderId { get; set; }
        public string SenderFullName { get; set; }
        public string SenderImage { get; set; }

        //subs
        public List<CommentDto> SubComments { get; set; } = new List<CommentDto>();
    }
}
