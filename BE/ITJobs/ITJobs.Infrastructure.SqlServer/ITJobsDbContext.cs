using ITJobs.Infrastructure.SqlServer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer
{
    public class ITJobsDbContext : DbContext
    {
        public DbSet<AppUser> Users { get; set; }
        public DbSet<Award> Awards { get; set; }
        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<Certification> Certifications { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<CommentHistory> CommentHistories { get; set; }
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<CV> CVs { get; set; }
        public DbSet<Education> Educations { get; set; }
        public DbSet<Employer> Employers { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<PostHistory> PostHistories { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<SearchFilter> SearchFilters { get; set; }
        public DbSet<SearchFilter_Post> SearchFilter_Posts { get; set; }
        public DbSet<SystemValue> SystemValues { get; set; }
        public DbSet<WorkExperience> WorkExperiences { get; set; }

        public ITJobsDbContext(DbContextOptions<ITJobsDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            #region không cho phép tự xóa khóa ngoại
            foreach (var foreignKey in modelBuilder.Model.GetEntityTypes()
                 .SelectMany(e => e.GetForeignKeys()))
            {
                foreignKey.DeleteBehavior = DeleteBehavior.NoAction;
            }
            #endregion không cho phép tự xóa khóa ngoại


            #region add khóa chính
            modelBuilder.Entity<SearchFilter_Post>()
            .HasKey(x => new { x.SearchFilterId, x.PostId });
            #endregion

        }
    }
}
