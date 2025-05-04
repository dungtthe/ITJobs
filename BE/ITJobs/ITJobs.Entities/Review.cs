using ITJobs.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities
{
    public class Review:BaseEntity
    {
        public Candidate Candidate { get; set; }
        public string Title { get; set; }
        public RatingType RatingType { get; set; }
        public bool IsRecommend { get; set; }
        public string Description { get; set; }
        public DateTime CreateAt { get; set; }
        public bool IsDelete { get; set; }
    }
}
