using ITJobs.Entities.Enums;
using ITJobs.Entities.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities
{
    public class Post : BaseEntity
    {
        public string Content { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public AppUser AppUser { get; set; }
        public PostType PostType { get; set; }
        public List<Reaction> Reactions { get; set; }
        public bool IsDeleted { get; set; }
        public List<string> KeyWords { get; set; }

        private long viewCount;
        public long ViewCount
        {
            get
            {
                return viewCount;
            }
            set
            {
                if (value < 0)
                {
                    throw new InvalidPostException.InvalidViewCountException();
                }
                viewCount = value;
            }
        }


        private DateTime? endDate;
        public DateTime? EndDate
        {
            get
            {
                return endDate;
            }
            set
            {
                if (PostType == PostType.JobPosting && value == null || value < DateTime.Now)
                {
                    throw new InvalidPostException.InvalidJobPostingException();
                }
                endDate = value;
            }
        }

        private long postingFee;
        public long PostingFee
        {
            get
            {
                return postingFee;
            }
            set
            {
                if (value < 0)
                {
                    throw new InvalidPostException.InvalidPostingFeeException();
                }
                postingFee = value;
            }
        }

        public List<JobApplication> JobApplications { get; set; }
        public List<Comment> Comments { get; set; }
        public List<SearchFilterRange> SearchFilterRanges { get; set; }
        public List<SearchFilterCheckBox> SearchFilterCheckBoxs { get; set; }
    }
}
