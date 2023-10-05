using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest 
        {
            public Activity Activity { get; set; } // want to receive as a parameter from our API
        }

        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }


            public async Task Handle(Command request, CancellationToken cancellationToken) //Unit is an object that mediator provides, doesnt have value (return nothing)
            {
                _context.Activities.Add(request.Activity); //adding the activity in memory

                await _context.SaveChangesAsync();

            }

        }
    }
}