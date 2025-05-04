using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Entities
{
    public class Location
    {
        public double Latitude { get; set; }   // Vĩ độ
        public double Longitude { get; set; }  // Kinh độ
        public string Address { get; set; }    
        public string PlaceName { get; set; }  
    }
}
