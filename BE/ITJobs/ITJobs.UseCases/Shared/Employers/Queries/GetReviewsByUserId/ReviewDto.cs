using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.Employers.Queries.GetReviewsByUserId
{
    public class ReviewDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public Entities.Enums.RatingType RatingType { get; set; }
        public bool IsRecommend { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }


        //sender
        public Guid SenderId { get; set; }
        public string SenderFullName { get; set; }
        public string SenderImage { get; set; }
    }
}
