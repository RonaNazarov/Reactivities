import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react'; //maybe add later Header, List 
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]); //activities - this is what we will store insite our state, setActivities - method to set the state we get get them back from the API
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode,setEditMode] = useState(false);

  useEffect(() =>{ // what we want to do when the application loads up
    axios.get<Activity[]>('http://localhost:5000/api/activities') //get data from the API, then method takes a callback function
    .then(Response => { 
      console.log(Response);
      setActivities(Response.data);
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
  activity.id ? setActivities([...activities.filter(x=>x.id!==activity.id),activity])
  :setActivities([...activities,{...activity,id:uuid()}]);
  setEditMode(false);
  setSelectedActivity(activity);
}

function handleDeleteActivity(id:String){
  setActivities([...activities.filter(x=>x.id!==id)])
}

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
        />
      </Container>
      
    </Fragment>
    
  )
}

export default App
