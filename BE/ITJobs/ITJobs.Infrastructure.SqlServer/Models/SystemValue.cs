using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Models
{
    [Table("SystemValues")]
    public class SystemValue:BaseModel
    {
        public int PostingFeePerDay { get; set; }
    }
}
