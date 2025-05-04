using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities
{
    public class Education:BaseEntity
    {
        public string Name { get; set; }
        public string WebsiteUrl { get; set; }//website truong hoc
        public string Degree { get; set; }
        public string FieldOfStudy { get; set; }
        public DateTime StartDate { get; set; }
        public bool IsCompleted { get; set; }
        public float GPA { get; set; }

    }
}
