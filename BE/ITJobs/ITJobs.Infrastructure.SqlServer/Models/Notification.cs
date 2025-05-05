using ITJobs.Entities.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Models
{
    [Table("Notifications")]
    public class Notification:BaseModel
    {
        public long UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual AppUser User { get; set; }
        public NotificationType NotificationType { get; set; }
        public long ReferenceId { get; set; }
        [MaxLength(1000)]
        public string Link { get; set; }
        [MaxLength(500)]
        public string Content { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreateAt { get; set; }
    }
}
