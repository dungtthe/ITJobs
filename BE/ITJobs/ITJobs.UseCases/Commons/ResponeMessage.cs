using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Commons
{
    public class ResponeMessage
    {
        public ResponeMessage() { }
        public ResponeMessage(int httpStatusCode, string msg)
        {
            this.HttpStatusCode = httpStatusCode;
            this.Message = msg;
        }
        public int HttpStatusCode { get; set; }
        public string Message { get; set; }
    }
}
