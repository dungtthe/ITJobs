using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.Posts.Commands.AddJobPost
{
    public class AddJobPostCommand : IRequest<Guid>
    {
        //phan post
        public Guid ?UserId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

        // public DateTime EndDate { get; set; } chua lam


        public List<SearchFilterRangeDto> SearchFilterRanges { get; set; } = new List<SearchFilterRangeDto>();
        public List<SearchFilterCheckBoxDto> SearchFilterCheckBoxs { get; set; } = new List<SearchFilterCheckBoxDto>();
        public List<SearchFilterComboboxDto> SearchFilterComboboxs { get; set; } = new List<SearchFilterComboboxDto>();

        public class SearchFilterRangeDto
        {
            public Guid SearchFilterId { get; set; }
            public string Min { get; set; }
            public string Max { get; set; }
        }

        public class SearchFilterCheckBoxDto
        {
            public Guid SearchFilterId { get; set; }
            public List<string> Values { get; set; }
        }

        public class SearchFilterComboboxDto
        {
            public Guid SearchFilterId { get; set; }
            public string Value { get; set; }
        }
    }
}
