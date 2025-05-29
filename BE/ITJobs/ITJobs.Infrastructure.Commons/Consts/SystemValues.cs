using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.Commons.Consts
{
    public static class SystemValues
    {
        public static readonly Guid ID_SYSTEMVALUE_JOB_POSTING_FEE_PER_DAY = Guid.Parse("C7079CC5-E6EE-4E58-A4FD-7D2A23A1698B");//cái systemvalue có id này là bản ghi có value lưu chi phí bài đăng tuyển dụng / ngày
        
        public static readonly Guid ID_SEARCH_FILTER_CITY = Guid.Parse("11539739-3D47-4505-B3C8-8E0A966E1B0F");//lưu trữ id của search fillter city để phục vụ truy vấn 
        public static readonly Guid ID_SEARCH_FILTER_SKILL = Guid.Parse("A2DDC797-B678-4B18-B056-4A92FF31F4A1");//lưu trữ id của search fillter skill để phục vụ truy vấn 
        public static readonly Guid ID_SEARCH_FILTER_COMPANY_TYPE = Guid.Parse("DEC3A352-FA24-4FA2-9928-EE02556FA769");//tuong tu

    }
}

