using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet] //api/activities
        public async Task<IActionResult>GetActivities()
        {
            return HandleResult(await Mediator.Send(new List.Query()));  
        }


        [HttpGet("{id}")] //open parentheses  api/activities/342341(id)
        public async Task<IActionResult> GetActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id=id}));
            //var activity =  await Mediator.Send(new Details.Query{Id=id});
            //if(activity == null) return NotFound();
            //return activity;
        }

        [HttpPost]
        public async Task <IActionResult> CreateActivity(Activity activity)// IActionResult Gives an access to the http response types(return ok, return bad request,not found..)
        {
            
            return HandleResult(await Mediator.Send(new Create.Command {Activity=activity}));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity (Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command {Activity = activity}));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend (Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command{Id=id}));
        }
    }
}