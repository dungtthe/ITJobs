using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities.Enums
{
    public enum StatusJobApplication:byte
    {
        Submitted = 1,     
        UnderReview = 2,   
        InterviewScheduled = 3, 
        Hired = 4,         
        Rejected = 5       
    }
}
