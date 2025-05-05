using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities.Enums
{
    public enum NotificationType:byte
    {
        PostJob = 0,
        PostNews = 1,
        Message = 2,
        Comment = 3,
        Reaction = 4,
        ApplyJob = 5
    }
}
