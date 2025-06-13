using ITJobs.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Interfaces.Repositories
{
    public interface ISearchFilter_PostRepository
    {
        Task AddSearchFilter_Post(Guid searchFilterId, Guid postId, string values);
        Task DeleteAllSearchFilterPostByPostId(Guid postId);
        Task<List<Entities.SearchFilter>> GetSearchFiltersByPostId(Guid postId);
    }
}
