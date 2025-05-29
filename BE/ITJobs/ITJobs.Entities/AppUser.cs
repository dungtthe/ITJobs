using ITJobs.Entities.Enums;
using ITJobs.Entities.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities
{
    public class AppUser:BaseEntity
    {
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Gender { get; set; }
        public DateTime ?DateOfBirth { get; set; }
        public string Image { get; set; }

        private long accountBalance;
        public long AccountBalance
        {
            get { return accountBalance; }
            set
            {
                if (value < 0)
                {
                    throw new InvalidBalanceException();
                }
                accountBalance = value;
            }
        }
        public RoleType RoleType { get; set; }
        public bool IsLocked { get; set; }
        public List<SocialMedia> SocialMediaLinks { get; set; }
    }
}
