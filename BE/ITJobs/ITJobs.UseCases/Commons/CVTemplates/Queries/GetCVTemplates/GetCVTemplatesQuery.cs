using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Commons.CVTemplates.Queries.GetCVTemplates
{
    public class GetCVTemplatesQuery:IRequest<List<CVTemplateDto>>
    {

    }
}
