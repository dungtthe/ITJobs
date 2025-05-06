using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Commons.Accounts.Queries.Login
{
    public class ResponeLoginDTO
    {
        public int HttpStatusCode { get; set; }
        public string Message { get; set; }

        public string FullName { get; set; }
        public string Image { get; set; }
        public string Token { get; set; }
    }
}
