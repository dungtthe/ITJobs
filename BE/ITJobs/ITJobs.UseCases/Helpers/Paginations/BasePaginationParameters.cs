using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Helpers.Paginations
{
    public abstract class BasePaginationParameters
    {
        private const int MaxPageSize = 100;
        private int _pageSize = 10;

        private int _pageNumber = 1;
        public int PageNumber
        {
            get => _pageNumber;
            set => _pageNumber = value < 1 ? 1 : value;
        }

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : (value < 1 ? 10 : value);
        }

        private string _searchTerm = "";
        public string SearchTerm
        {
            get => _searchTerm;
            set => _searchTerm = value?.Trim() ?? "";
        }
    }
}
