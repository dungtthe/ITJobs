using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.CVTemplates.Queries.GetCVTemplates
{
    public class CVTemplateDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }//tac gia tao ra template
        public string AuthorName { get; set; }
        public string AuthorImage { get; set; }
        public string Content { get; set; }
        public int SortOrder { get; set; }
    }
}
