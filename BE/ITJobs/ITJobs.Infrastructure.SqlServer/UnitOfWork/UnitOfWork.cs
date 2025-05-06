using ITJobs.UseCases.Interfaces.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.Infrastructure.SqlServer.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ITJobsDbContext _context;
        public UnitOfWork(ITJobsDbContext context)
        {
            _context = context;
        }
        public async Task BeginTransactionAsync()
        {
            await Task.CompletedTask;
        }

        public async Task CommitAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task RollbackAsync()
        {
            await Task.CompletedTask;
        }
    }
}
