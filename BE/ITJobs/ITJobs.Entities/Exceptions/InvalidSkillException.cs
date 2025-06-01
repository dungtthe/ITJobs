using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities.Exceptions
{
    public class InvalidSkillException : Exception
    {
        public InvalidSkillException(string message) : base(message)
        {
        }
        public InvalidSkillException() : base("Skill không hợp lệ")
        {
        }
    }
}
