using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;


namespace Application.Activities
{
    public class List
    {
        
        public class Query:IRequest<Result<List<ActivityDto>>>{}

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            private readonly DataContext _contex;
            private readonly IMapper _mapper;
            public Handler(DataContext contex,IMapper mapper)
            {
                _mapper = mapper;
                _contex = contex;
            }
            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken) // Handle method that returns a task of list of activity (async bcs of the return)
            {
                var activities = await _contex.Activities
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<ActivityDto>>.Success(activities);
            }

        }
    }
}