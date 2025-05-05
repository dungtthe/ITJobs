using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Models
{
    [Table("Conversations")]
    public class Conversation:BaseModel
    {
        public long UserId1 { get; set; }
        [ForeignKey(nameof(UserId1))]
        public virtual AppUser User1 { get; set; }


        public long UserId2 { get; set; }
        [ForeignKey(nameof(UserId2))]
        public virtual AppUser User2 { get; set; }
    }
}
