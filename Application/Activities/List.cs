using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;


namespace Application.Activities
{
    public class List
    {
        
        public class Query:IRequest<Result<List<Activity>>>{}

        public class Handler : IRequestHandler<Query, Result<List<Activity>>>
        {
            private readonly DataContext _contex;
            public Handler(DataContext contex)
            {
                _contex = contex;
            }
            public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken) // Handle method that returns a task of list of activity (async bcs of the return)
            {
                return Result<List<Activity>>.Success(await _contex.Activities.ToListAsync(cancellationToken));
            }

        }
    }
}