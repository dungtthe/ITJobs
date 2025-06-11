using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.UploadCVs
{
    public class UploadCVsCommand:IRequest<List<Entities.CV>>
    {
        public Guid? UserId { get; set; }

        public List<Entities.CV> CVs { get; set; }
    }


}
