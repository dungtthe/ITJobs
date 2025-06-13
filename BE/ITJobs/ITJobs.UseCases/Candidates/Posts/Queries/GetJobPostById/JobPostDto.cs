using ITJobs.UseCases.Shared.ShareDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Posts.Queries.GetJobPostById
{
    public class JobPostDto
    {
        //post
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime EndDate { get; set; }
        public List<string> WorkTypes { get; set; }
        public List<string> LocationNames { get; set; }
        public List<string> Skills { get; set; }

        //searchFilter other
        public List<Entities.SearchFilterRange> SearchFilterRanges { get; set; } = new List<Entities.SearchFilterRange>();
        public List<Entities.SearchFilterCheckBox> SearchFilterCheckBoxs { get; set; } = new List<Entities.SearchFilterCheckBox>();
        public List<Entities.SearchFilterCombobox> SearchFilterComboboxs { get; set; } = new List<Entities.SearchFilterCombobox>();

        public string Content { get; set; }

        //employer
        public Guid UserId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyImage { get; set; }

        public List<Entities.GeneralInfoItem> GeneralInfo { get; set; } = new List<Entities.GeneralInfoItem>();
        //review
        public int TotalReviews { get; set; }
        public int TotalRecommended { get; set; }
        public float AverageRating { get; set; }
    }
}
