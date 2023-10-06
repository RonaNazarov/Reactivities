import { Fragment, useEffect, useState } from 'react';
import { Container} from 'semantic-ui-react'; //maybe add later Header, List 
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]); //activities - this is what we will store insite our state, setActivities - method to set the state we get get them back from the API
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode,setEditMode] = useState(false);
  const [Loading,setLoading] = useState(true);
  const [submitting,setSubmitting] = useState(false);

  useEffect(() =>{ // what we want to do when the application loads up
    agent.Activities.list() //get data from the API, then method takes a callback function
    .then(Response => { 
      let activities:Activity[]=[];
      Response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      });
      setActivities(activities);
      setLoading(false);
    })
  },[]) // Dependencies inside an array - only fires once.

function handleSelectActivity(id:string){
  setSelectedActivity(activities.find(x=>x.id===id))
}

function handleCancelSelectActivity(){
  setSelectedActivity(undefined);
}

function handleFormOpen(id?:string){
  id ? handleSelectActivity(id) : handleCancelSelectActivity();
  setEditMode(true);
}

function handleFormClose(){
  setEditMode(false);
}

function handleCreateOrEditActivity(activity:Activity){
  setSubmitting(true);
  if(activity.id){
    agent.Activities.update(activity).then(()=>{
      setActivities([...activities.filter(x=>x.id!==activity.id),activity])
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    })
  }else{
    activity.id=uuid();
    agent.Activities.create(activity).then(()=>{
      setActivities([...activities,activity])
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    })
  }
}

function handleDeleteActivity(id:string){
  setSubmitting(true);
  agent.Activities.delete(id).then(()=>{
    setActivities([...activities.filter(x=>x.id!==id)]);
    setSubmitting(false);
  })
  
}

if(Loading) return <LoadingComponent content='Loading app'/>

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities}
          selectedActivity = {selectedActivity}
          selectActivity = {handleSelectActivity}
          cancelSelectActivity = {handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting = {submitting}
        />
      </Container>
      
    </Fragment>
    
  )
}

export default App
