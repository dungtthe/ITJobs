using ITJobs.Entities.Exceptions;
using ITJobs.Infrastructure.SqlServer;
using ITJobs.Infrastructure.SqlServer.Models;
using ITJobs.UseCases.Candidates.Accounts.Commands.Register;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace ITJobs.Infrastructure.APIs.Areas.Admins
{
    [Area("Admin")]
    [Route("api/admin")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ITJobsDbContext _context;
        private IMediator _mediator;
        public HomeController(ITJobsDbContext context,IMediator mediator)
        {
            _context = context;
            _mediator = mediator;
        }


        [HttpGet("/seed")]
        public async Task<IActionResult> Seed()
        {
            if (await _context.Users.AnyAsync() || await _context.SystemValues.AnyAsync())
            {
                return BadRequest("Co du lieu roi nen khong cho seed.");
            }

            #region post
            //system value
            var sysPostFee = new SystemValue()
            {
                Id = ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SYSTEMVALUE_JOB_POSTING_FEE_PER_DAY,
                Name = "Phí đăng tin",
                Description = "Phí đăng tin/ ngày cho bài đăng tuyển dụng",
                Values = "50000",
                CanEdit = true
            };
            await _context.SystemValues.AddAsync(sysPostFee);
            #endregion

            #region  SearchFilters
            var viewOrder = 1;

            //danh sách tỉnh thành
            var cities = new List<string>
                                            {
                                                "Hà Nội",
                                                "TP. Hồ Chí Minh",
                                                "Đà Nẵng",
                                                "An Giang",
                                                "Bà Rịa - Vũng Tàu",
                                                "Bắc Giang",
                                                "Bắc Kạn",
                                                "Bạc Liêu",
                                                "Bắc Ninh",
                                                "Bến Tre",
                                                "Bình Định",
                                                "Bình Dương",
                                                "Bình Phước",
                                                "Bình Thuận",
                                                "Cà Mau",
                                                "Cần Thơ",
                                                "Cao Bằng",
                                                "Đắk Lắk",
                                                "Đắk Nông",
                                                "Điện Biên",
                                                "Đồng Nai",
                                                "Đồng Tháp",
                                                "Gia Lai",
                                                "Hà Giang",
                                                "Hà Nam",
                                                "Hà Tĩnh",
                                                "Hải Dương",
                                                "Hải Phòng",
                                                "Hậu Giang",
                                                "Hòa Bình",
                                                "Hưng Yên",
                                                "Khánh Hòa",
                                                "Kiên Giang",
                                                "Kon Tum",
                                                "Lai Châu",
                                                "Lâm Đồng",
                                                "Lạng Sơn",
                                                "Lào Cai",
                                                "Long An",
                                                "Nam Định",
                                                "Nghệ An",
                                                "Ninh Bình",
                                                "Ninh Thuận",
                                                "Phú Thọ",
                                                "Phú Yên",
                                                "Quảng Bình",
                                                "Quảng Nam",
                                                "Quảng Ngãi",
                                                "Quảng Ninh",
                                                "Quảng Trị",
                                                "Sóc Trăng",
                                                "Sơn La",
                                                "Tây Ninh",
                                                "Thái Bình",
                                                "Thái Nguyên",
                                                "Thanh Hóa",
                                                "Thừa Thiên Huế",
                                                "Tiền Giang",
                                                "Trà Vinh",
                                                "Tuyên Quang",
                                                "Vĩnh Long",
                                                "Vĩnh Phúc",
                                                "Yên Bái"
                                            };
            var searchFilterCity = new SearchFilter()
            {
                Id = ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_CITY,
                Name = "Danh sách tỉnh thành",
                SearchFilterType = Entities.Enums.SearchFilterType.Checkbox,
                Values = JsonConvert.SerializeObject(cities),
                ViewOrder = viewOrder++,
                IsCreatedBySystem = true
            };
            await _context.SearchFilters.AddAsync(searchFilterCity);

            //loại công ty
            var companyTypes = new List<string>()
                {
                    "Công ty TNHH",
                    "Công ty Cổ phần",
                    "Công ty tư nhân",
                    "Công ty nhà nước",
                    "Doanh nghiệp FDI",
                    "Tập đoàn",
                    "Startup",
                    "Công ty phi lợi nhuận",
                    "Doanh nghiệp cá nhân"
                };
            var searchFilterCompanyType = new SearchFilter()
            {
                Id = ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_COMPANY_TYPE,
                Name = "Loại công ty",
                SearchFilterType = Entities.Enums.SearchFilterType.Combobox,
                Values = JsonConvert.SerializeObject(companyTypes),
                ViewOrder = viewOrder++,
                IsCreatedBySystem = true
            };
            await _context.SearchFilters.AddAsync(searchFilterCompanyType);

            //skill
            var skillNames = new List<string>
                                        {
                                            "C#",
                                            "C++",
                                            "Java",
                                            "Python",
                                            "JavaScript",
                                            "TypeScript",
                                            "ReactJS",
                                            "Angular",
                                            "VueJS",
                                            "Node.js",
                                            "ASP.NET Core",
                                            "DevOps",
                                            "Docker",
                                            "Kubernetes",
                                            "AWS",
                                            "Azure",
                                            "SQL Server",
                                            "MySQL",
                                            "PostgreSQL",
                                            "MongoDB",
                                            "Redis",
                                            "Jest",
                                            "Selenium",
                                            "Jira",
                                            "Git",
                                            "Machine Learning",
                                            "Data Science"
                                        };
            var searchFilterSkill = new SearchFilter()
            {
                Id = ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_SKILL,
                Name = "Danh sách kỹ năng",
                SearchFilterType = Entities.Enums.SearchFilterType.Checkbox,
                Values = JsonConvert.SerializeObject(skillNames),
                ViewOrder = viewOrder++,
                IsCreatedBySystem = true
            };
            await _context.SearchFilters.AddAsync(searchFilterSkill);


            //cấp bậc
            var levels = new List<string>() {
                                    "Fresher",
                                    "Junior",
                                    "Senior",
                                    "Manager"
                                };
            var searchFilterLevel = new SearchFilter()
            {
                Id = Guid.NewGuid(),
                Name = "Cấp bậc",
                SearchFilterType = Entities.Enums.SearchFilterType.Checkbox,
                Values = JsonConvert.SerializeObject(levels),
                ViewOrder = viewOrder++,
                IsCreatedBySystem = true
            };
            await _context.SearchFilters.AddAsync(searchFilterLevel);

            //hình thức làm việc
            var workingArrangements = new List<string>() {
                                                "Tại văn phòng",
                                                "Làm từ xa",
                                                "Linh hoạt"
                                            };
            var searchFilterWorkingArrangement = new SearchFilter()
            {
                Id = ITJobs.Infrastructure.Commons.Consts.SystemValues.ID_SEARCH_FILTER_WORK_TYPE,
                Name = "Hình thức làm việc",
                SearchFilterType = Entities.Enums.SearchFilterType.Checkbox,
                Values = JsonConvert.SerializeObject(workingArrangements),
                ViewOrder = viewOrder++,
                IsCreatedBySystem = true
            };
            await _context.SearchFilters.AddAsync(searchFilterWorkingArrangement);
            //mức lương
            var searchFilterSalary = new SearchFilter()
            {
                Id = Guid.NewGuid(),
                Name = "Mức lương",
                SearchFilterType = Entities.Enums.SearchFilterType.Range,
                Values = "0_1000000000",
                ViewOrder = viewOrder++,
                IsCreatedBySystem = true
            };
            await _context.SearchFilters.AddAsync(searchFilterSalary);

            //lĩnh vực công việc
            var industries = new List<string>()
                                    {
                                        "Thực Phẩm và Đồ Uống",
                                        "Du Lịch và Dịch Vụ Lưu Trú",
                                        "Bảo Hiểm",
                                        "Hàng Tiêu Dùng",
                                        "Thương Mại Điện Tử",
                                        "Giáo Dục và Đào Tạo",
                                        "Ngân Hàng",
                                        "Trò Chơi",
                                        "Chính Phủ",
                                        "Phần Cứng và Điện Toán",
                                        "Phi Lợi Nhuận và Dịch Vụ Xã Hội",
                                        "Sản Xuất và Kỹ Thuật",
                                        "Truyền Thông, Quảng Cáo và Giải Trí",
                                        "Môi Trường",
                                        "Dược Phẩm",
                                        "Bất Động Sản và Xây Dựng",
                                        "Bán Lẻ và Bán Buôn",
                                        "Dịch Vụ và Tư Vấn IT",
                                        "Viễn Thông",
                                        "Vận Tải, Logistics và Kho Hàng",
                                        "An Ninh Mạng",
                                        "Mua Bán và Thương Mại",
                                        "Mạng Lưới và Cơ Sở Hạ Tầng",
                                        "Thuê Ngoài Phát Triển Phần Mềm",
                                        "Sản Phẩm Phần Mềm và Dịch Vụ Web",
                                        "Nông Nghiệp",
                                        "Thể thao và Thể hình",
                                        "May mặc và Thời Trang",
                                        "Sáng Tạo và Thiết Kế",
                                        "Cung Ứng và Tuyển Dụng",
                                        "Xuất Bản và In Ấn",
                                        "Quản Lý Cơ Sở Vật Chất",
                                        "AI, Blockchain và Dịch Vụ Deep Tech",
                                        "Dịch Vụ Nghiên Cứu",
                                        "Chăm Sóc Sức Khỏe",
                                        "Vật Liệu và Khai Thác",
                                        "Công Nghiệp Tiện Ích",
                                        "Dịch Vụ Chuyên Nghiệp",
                                        "Chứng khoán và Đầu tư",
                                        "Dịch Vụ Tài Chính"
                                    };
            var searchFilterIndustry = new SearchFilter()
            {
                Id = Guid.NewGuid(),
                Name = "Lĩnh vực công việc",
                SearchFilterType = Entities.Enums.SearchFilterType.Checkbox,
                Values = JsonConvert.SerializeObject(industries),
                ViewOrder = viewOrder++,
                IsCreatedBySystem = true
            };
            await _context.SearchFilters.AddAsync(searchFilterIndustry);


            #endregion

            await _context.SaveChangesAsync();
            return Ok("hihi");
        }

        [HttpGet("testadmin")]
        public async Task<IActionResult> Get()
        {
            await Task.CompletedTask;
            return Ok("test admin");
        }


        [HttpGet("/seednew")]
        public async Task<IActionResult> SeedNew()
        {
            var random = new Random();

            //50 candidate
            //for (int i = 0; i < 50; i++)
            //{
            //    var command = new RegisterAccountCommand
            //    {
            //        Email = $"c{i}@gmail.com",
            //        Password = "123456",
            //        FullName = $"Candidate{i}"
            //    };

            //    try
            //    {
            //        await _mediator.Send(command);
            //    }
            //    catch (EmailAlreadyExistsException)
            //    {
            //        continue;
            //    }
            //}

            //reviewer to mbbank
            //var employerIdMbBank = new Guid("23A950FB-2454-40E3-A23B-4E84ED0898A0");
            //var candidates = await _context.Candidates.ToListAsync();
            //foreach (var candidate in candidates)
            //{
            //    var review = new Review
            //    {
            //       EmployerId = employerIdMbBank,
            //       CandidateId = candidate.Id,
            //       Title = $"Đánh giá của {candidate.User.FullName} về MB Bank",
            //       RatingType = (Entities.Enums.RatingType)random.Next(1, 6),
            //       IsRecommend = random.Next(0, 2) == 1, 
            //       Description = $"Đây là một đánh giá mẫu của {candidate.User.FullName} về MB Bank. Tôi đã làm việc tại đây trong một thời gian và cảm thấy rất hài lòng với môi trường làm việc cũng như cơ hội phát triển nghề nghiệp. Tôi khuyên bạn nên ứng tuyển vào MB Bank nếu có cơ hội.",
            //       CreateAt = DateTime.UtcNow,
            //       IsDelete = false
            //    };
            //    await _context.Reviews.AddAsync(review);
            //}


            //job post
            //var jopPostMbBank = await _context.Posts.FirstOrDefaultAsync(p => p.Id == new Guid("55FCE878-34DF-406B-9D2F-08DDAA536BAD"));
            //if (jopPostMbBank != null)
            //{
            //    var searchFilterPosts = await _context.SearchFilter_Posts.Where(s => s.PostId == jopPostMbBank.Id).ToListAsync();
            //    //for(int i = 0; i < 15; i++)
            //    //{
            //    //    var postIdNew = Guid.NewGuid();
            //    //    var now = DateTime.Now;
            //    //    await _context.Posts.AddAsync(new Post()
            //    //    {
            //    //        Id = postIdNew,
            //    //        UserId = jopPostMbBank.UserId,
            //    //        Title = "Lập trình viên .NET " +i,
            //    //        ShortContent="a",
            //    //        MainImage=null,
            //    //        Content = jopPostMbBank.Content,
            //    //        CreatedAt = now,
            //    //        UpdatedAt = now,
            //    //        PostType = Entities.Enums.PostType.JobPosting,
            //    //        EndDate = now.AddDays(random.Next(10, 20)),
            //    //        PostingFee = 50000 * random.Next(1,20)
            //    //    });
            //    //}

            //    var posts = await _context.Posts.Where(p => p.Title.Contains("Lập trình viên .NET")).ToListAsync();
            //    foreach(var item in  posts)
            //    {
            //        foreach(var searchFilterPost in searchFilterPosts)
            //        {
            //            await _context.SearchFilter_Posts.AddAsync(new SearchFilter_Post()
            //            {
            //                SearchFilterId = searchFilterPost.SearchFilterId,
            //                PostId = item.Id,
            //                Values = searchFilterPost.Values
            //            });
            //        }
            //    }

            //}


            //seed comment
            //var users = await _context.Users.ToListAsync();
            //var posts = await _context.Posts.ToListAsync();
            //foreach (var post in posts)
            //{
            //    var  comments = new List<SqlServer.Models.Comment>();

            //    //comment to post
            //    for (int i = 0; i < users.Count; i++)
            //    {
            //        var randomUser = users[random.Next(users.Count)];

            //        var reactionsRandom = new List<Entities.Reaction>();
            //        var shuffledUserIds = users.Select(u => u.Id).OrderBy(_ => random.Next()).ToList();
            //        int reactionCount = Math.Min(random.Next(1, 6), shuffledUserIds.Count);
            //        for (int j = 0; j < reactionCount; j++)
            //        {
            //            var randomReactionType = (Entities.Enums.ReactionType)(random.Next(1, 7)); 
            //            reactionsRandom.Add(new Entities.Reaction
            //            {
            //                UserId = shuffledUserIds[j],
            //                ReactionType = randomReactionType
            //            });
            //        }

            //        var comment = new SqlServer.Models.Comment()
            //        {
            //            Id = Guid.NewGuid(),
            //            PostId = post.Id,
            //            Content = $"Đây là bình luận mẫu {i} của {randomUser.FullName} về bài đăng {post.Title}.",
            //            CreatedAt = DateTime.UtcNow.AddDays(-random.Next(1, 30)),
            //            SenderId = randomUser.Id,
            //            ParrentCommentId = null,
            //            ReactionType_UserId_Ids = JsonConvert.SerializeObject(reactionsRandom),
            //            IsRevoked = false
            //        };
            //        comments.Add(comment);
            //        await _context.Comments.AddAsync(comment);
            //    }

            //    //reply to comment
            //    foreach (var comment in comments)
            //    {
            //        for (int i = 0; i < random.Next(1, 5); i++) 
            //        {
            //            var randomUser = users[random.Next(users.Count)];

            //            var reactionsRandom = new List<Entities.Reaction>();
            //            var shuffledUserIds = users.Select(u => u.Id).OrderBy(_ => random.Next()).ToList();
            //            int reactionCount = Math.Min(random.Next(1, 6), shuffledUserIds.Count);
            //            for (int j = 0; j < reactionCount; j++)
            //            {
            //                var randomReactionType = (Entities.Enums.ReactionType)(random.Next(1, 7));
            //                reactionsRandom.Add(new Entities.Reaction
            //                {
            //                    UserId = shuffledUserIds[j],
            //                    ReactionType = randomReactionType
            //                });
            //            }

            //            var replyComment = new SqlServer.Models.Comment()
            //            {
            //                Id = Guid.NewGuid(),
            //                PostId = post.Id,
            //                Content = $"Đây là bình luận trả lời mẫu {i} của {randomUser.FullName} về bình luận {comment.Content}.",
            //                CreatedAt = comment.CreatedAt.AddMinutes(random.Next(1, 60)),
            //                SenderId = randomUser.Id,
            //                ParrentCommentId = comment.Id,
            //                ReactionType_UserId_Ids = JsonConvert.SerializeObject(reactionsRandom),
            //                IsRevoked = false
            //            };
            //            await _context.Comments.AddAsync(replyComment);
            //        }
            //    }
            //}


            //Reaction to post
            var posts = await _context.Posts.ToListAsync();
            var users = await _context.Users.ToListAsync();
            foreach (var post in posts)
            {
                var reactions = new List<Entities.Reaction>();
                foreach (var user in users)
                {
                    var randomReactionType = (Entities.Enums.ReactionType)(random.Next(1, 7));
                    reactions.Add(new Entities.Reaction
                    {
                        UserId = user.Id,
                        ReactionType = randomReactionType
                    });
                }
                post.ReactionType_UserId_Ids = JsonConvert.SerializeObject(reactions);
            }

            await _context.SaveChangesAsync();
            return Ok("OK");
        }

    }
}
