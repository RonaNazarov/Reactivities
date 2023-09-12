import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]); //activities - this is what we will store insite our state, setActivities - method to set the state we get get them back from the API

  useEffect(() =>{ // what we want to do when the application loads up
    axios.get('http://localhost:5000/api/activities') //get data from the API, then method takes a callback function
    .then(Response => { 
      console.log(Response);
      setActivities(Response.data);
    })
  },[]) // Dependencies inside an array - only fires once.
  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities'/>
      <List>
        {activities.map((activity:any) =>( //any because we dont have an interface yet
          <List.Item key={activity.id}>
            {activity.title}
        </List.Item>
        ))}
      </List>
    </div>
    
  )
}

export default App
