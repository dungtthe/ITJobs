using ITJobs.UseCases.Shared.ShareDtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.Posts.Commands.UpdateJobPost
{
    public class UpdateJobPostCommand:IRequest<Unit>
    {
        public Guid? UserId { get; set; }
        public Guid PostId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }


        public List<SearchFilterRangeDto> SearchFilterRanges { get; set; } = new List<SearchFilterRangeDto>();
        public List<SearchFilterCheckBoxDto> SearchFilterCheckBoxs { get; set; } = new List<SearchFilterCheckBoxDto>();
        public List<SearchFilterComboboxDto> SearchFilterComboboxs { get; set; } = new List<SearchFilterComboboxDto>();

       
    }
}
