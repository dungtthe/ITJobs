using ITJobs.UseCases.Interfaces.Repositories;
using ITJobs.UseCases.Interfaces.UnitOfWork;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITJobs.UseCases.Candidates.JobApplications.Commands.AddJobApplication
{
    public class AddJobApplicationCommandHandler : IRequestHandler<AddJobApplicationCommand, Guid>
    {
        private readonly IJobApplicationRepository _jobApplicationRepository;
        private readonly IUnitOfWork _unitOfWork;
        public AddJobApplicationCommandHandler(IJobApplicationRepository jobApplicationRepository, IUnitOfWork unitOfWork)
        {
            _jobApplicationRepository = jobApplicationRepository;
            _unitOfWork = unitOfWork;
        }
        public async Task<Guid> Handle(AddJobApplicationCommand request, CancellationToken cancellationToken)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();
                var idAdd = Guid.NewGuid();
                await _jobApplicationRepository.AddJobApplicationAsync(request,idAdd);
                await _unitOfWork.CommitAsync();
                return idAdd;
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
