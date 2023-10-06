import { Fragment, useEffect} from 'react';
import {Container} from 'semantic-ui-react'; //maybe add later Header, List 
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore}=useStore();

  useEffect(() =>{ // what we want to do when the application loads up
    activityStore.loadActivities();
  },[activityStore]) // Dependencies inside an array - only fires once.


if(activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>

  return (
    <Fragment>
      <NavBar/>
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard/>
        </Container>
      
    </Fragment>
    
  )
}

export default observer(App);
