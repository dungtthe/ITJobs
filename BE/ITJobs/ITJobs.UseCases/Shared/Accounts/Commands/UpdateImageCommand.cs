using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Shared.Accounts.Commands
{
    public class UpdateImageCommand:IRequest<Unit>
    {
        public Guid? UserId { get; set; }
        public string Image { get; set; }
    }
}
