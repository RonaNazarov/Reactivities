using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;


namespace Application.Activities
{
    public class List
    {
        
        public class Query:IRequest<List<Activity>>{}

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _contex;
            public Handler(DataContext contex)
            {
                _contex = contex;
            }
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken) // Handle method that returns a task of list of activity (async bcs of the return)
            {
                return await _contex.Activities.ToListAsync();
            }

        }
    }
}