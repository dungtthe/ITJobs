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
    [Table("Users")]
    public class AppUser: BaseModel
    {
        [Required]
        [MinLength(4)]
        [MaxLength(300)]
        public string UserName { get; set; }

        [Required]
        [MinLength(4)]
        [MaxLength(300)]
        public string Password { get; set; }

        [Required]
        [MinLength(4)]
        [MaxLength(300)]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(500)]
        public string Email { get; set; }

        [Phone]
        [MaxLength(50)]
        public string PhoneNumber { get; set; }

        [MaxLength(500)]
        public string Address { get; set; }

        [MaxLength(3)]
        public string Gender { get; set; }
        public DateTime ?DateOfBirth { get; set; }

        [MaxLength(1000)]
        public string Image { get; set; }
        public long AccountBalance { get; set; }

        [Required]
        public RoleType RoleType { get; set; }
        public bool IsLocked { get; set; }

        [MaxLength(4000)]
        public string SocialMediaLinks { get; set; }

        public AppUser()
        {
            AccountBalance = 0;
            SocialMediaLinks = "[]";
            Image = "no_img_user.png";
            IsLocked = false;
        }
    }
}
