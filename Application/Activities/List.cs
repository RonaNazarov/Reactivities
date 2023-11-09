using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext contex,IMapper mapper,IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _contex = contex;
            }
            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken) // Handle method that returns a task of list of activity (async bcs of the return)
            {
                var activities = await _contex.Activities
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider,
                        new {currentUsername = _userAccessor.GetUsername()})
                    .ToListAsync(cancellationToken);

                return Result<List<ActivityDto>>.Success(activities);
            }

        }
    }
}