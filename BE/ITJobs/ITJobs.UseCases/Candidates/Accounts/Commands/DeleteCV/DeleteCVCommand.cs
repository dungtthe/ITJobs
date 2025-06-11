using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.Accounts.Commands.DeleteCV
{
    public class DeleteCVCommand: IRequest<string>
    {
        public Guid ?UserId { get; set; }
        public Guid CVId { get; set; }
    }
}
