using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Helpers.Behaviours
{
    public class ErrorResponse
    {
        public Dictionary<string, string[]> Errors { get; set; }
        public string Message { get; set; } = "Dữ liệu không hợp lệ";
    }

}
