using ITJobs.Entities;
using ITJobs.UseCases.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Repositories
{
    public class SearchFilter_PostRepository : ISearchFilter_PostRepository
    {
        private readonly ITJobsDbContext _dbContext;
        public SearchFilter_PostRepository(ITJobsDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task AddSearchFilter_Post(Guid searchFilterId, Guid postId, string values)
        {
            await _dbContext.AddAsync(new Models.SearchFilter_Post()
            {
                SearchFilterId = searchFilterId,
                PostId = postId,
                Values = values
            });
        }

        public async Task DeleteAllSearchFilterPostByPostId(Guid postId)
        {
            var searchFilterPosts = await _dbContext.SearchFilter_Posts.Where(x => x.PostId == postId).ToListAsync();
            if (searchFilterPosts.Any())
            {
                _dbContext.SearchFilter_Posts.RemoveRange(searchFilterPosts);
            }
        }

        public async Task<List<Entities.SearchFilter>> GetSearchFiltersByPostId(Guid postId)
        {
            var result = new List<Entities.SearchFilter>();
            var searchFilter_post_s = await _dbContext.SearchFilter_Posts.Include(p=>p.SearchFilter).Where(p => p.PostId == postId).ToListAsync();
            foreach(var searchFilter_Post in searchFilter_post_s)
            {
                if (Entities.Enums.SearchFilterType.Combobox == searchFilter_Post.SearchFilter.SearchFilterType)
                {
                    result.Add(new SearchFilterCombobox()
                    {
                        Id = searchFilter_Post.SearchFilter.Id,
                        Name = searchFilter_Post.SearchFilter.Name,
                        ViewOrder = searchFilter_Post.SearchFilter.ViewOrder,
                        IsCreatedBySystem = searchFilter_Post.SearchFilter.IsCreatedBySystem,
                        Values = new List<string>() { searchFilter_Post.Values }
                    });
                }
                else if(Entities.Enums.SearchFilterType.Checkbox == searchFilter_Post.SearchFilter.SearchFilterType)
                {
                    result.Add(new SearchFilterCheckBox()
                    {
                        Id = searchFilter_Post.SearchFilter.Id,
                        Name = searchFilter_Post.SearchFilter.Name,
                        ViewOrder = searchFilter_Post.SearchFilter.ViewOrder,
                        IsCreatedBySystem = searchFilter_Post.SearchFilter.IsCreatedBySystem,
                        Values = JsonConvert.DeserializeObject<List<string>>(searchFilter_Post.Values)
                    });
                }
                else
                {
                    string[] s = searchFilter_Post.Values.Split("_"); 
                    result.Add(new SearchFilterRange()
                    {
                        Id = searchFilter_Post.SearchFilter.Id,
                        Name = searchFilter_Post.SearchFilter.Name,
                        ViewOrder = searchFilter_Post.SearchFilter.ViewOrder,
                        IsCreatedBySystem = searchFilter_Post.SearchFilter.IsCreatedBySystem,
                        Min = long.Parse(s[0]),
                        Max =long.Parse(s[1]),
                    });
                }
            }

            return result;
        }
    }
}
