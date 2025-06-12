using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.DeleteCertification
{
    public class DeleteCertificationCommand : IRequest<Unit>
    {
        public Guid? UserId { get; set; }
        public Guid CertificationId { get; set; }
    }
}
