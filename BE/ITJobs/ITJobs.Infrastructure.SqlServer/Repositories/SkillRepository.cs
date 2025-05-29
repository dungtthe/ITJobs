using ITJobs.UseCases.Commons.Skills.Queries.GetSkills;
using ITJobs.UseCases.Commons.Skills.Queries.GetSuggestedSkillsSummary;
using ITJobs.UseCases.Helpers.Paginations;
using ITJobs.UseCases.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.Repositories
{
    public class SkillRepository : ISkillRepository
    {
        private readonly ITJobsDbContext _dbContext;
        public SkillRepository(ITJobsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<PagedResult<SkillDto>> GetSkillsForCommonAsync(GetSkillsQuery request)
        {
            var query = _dbContext.Skills.AsQueryable();
            if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            {
                var searchTerm = request.SearchTerm.ToLower();
                query = query.Where(s => s.Name.ToLower().Contains(searchTerm) ||
                                       s.Description.ToLower().Contains(searchTerm));
            }

            var totalRecords = await query.CountAsync();
            var items = await query
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(s => new SkillDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description,
                })
                .ToListAsync();
            return new PagedResult<SkillDto>
            {
                Items = items,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                TotalRecords = totalRecords,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)request.PageSize)
            };
        }


        //Tạm thời làm kiểu random
        public async Task<PagedResult<SkillSummaryDto>> GetSuggestedSkillsSummarForCommonAsync(GetSuggestedSkillsSummaryQuery request)
        {
            // Lấy tổng số skill có trong database
            var totalSkills = await _dbContext.Skills.CountAsync();

            // Tạo random với seed từ PageNumber để đảm bảo tính nhất quán
            var random = new Random(request.PageNumber);

            // Lấy toàn bộ skill IDs
            var allSkillIds = await _dbContext.Skills
                .Select(s => s.Id)
                .ToListAsync();

            // Shuffle danh sách IDs theo seed cố định
            var shuffledIds = ShuffleWithSeed(allSkillIds, request.PageNumber);

            // Lấy phần subset tương ứng với page hiện tại
            var startIndex = (request.PageNumber - 1) * request.PageSize;
            var pageIds = shuffledIds
                .Skip(startIndex)
                .Take(request.PageSize)
                .ToList();

            // Query các skills tương ứng
            var skills = await _dbContext.Skills
                .Where(s => pageIds.Contains(s.Id))
                .Select(s => new SkillSummaryDto
                {
                    Id = s.Id,
                    Name = s.Name,
                })
                .ToListAsync();

            // Sắp xếp lại theo thứ tự đã shuffle
            skills = skills
                .OrderBy(s => pageIds.IndexOf(s.Id))
                .ToList();

            // Tạo kết quả phân trang
            var result = new PagedResult<SkillSummaryDto>
            {
                Items = skills,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                TotalRecords = totalSkills,
                TotalPages = (int)Math.Ceiling(totalSkills / (double)request.PageSize)
            };

            return result;
        }

        private List<Guid> ShuffleWithSeed(List<Guid> list, int seed)
        {
            var rng = new Random(seed);
            var n = list.Count;
            var result = new List<Guid>(list);

            // Fisher-Yates shuffle algorithm
            while (n > 1)
            {
                n--;
                var k = rng.Next(n + 1);
                var value = result[k];
                result[k] = result[n];
                result[n] = value;
            }

            return result;
        }
    }
}
