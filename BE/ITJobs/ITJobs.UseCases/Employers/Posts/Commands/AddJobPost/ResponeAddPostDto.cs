using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Employers.Posts.Commands.AddJobPost
{
    public class ResponeAddPostDto
    {
        public Guid PostId { get; set; }
        public string AccountBalance { get; set; } 
    }
}
