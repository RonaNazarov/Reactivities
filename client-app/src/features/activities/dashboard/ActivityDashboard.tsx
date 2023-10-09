//import React from 'react'
import { Grid } from 'semantic-ui-react' //maybe add later List
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();
    const {loadActivities,activityRegistry}=activityStore;

    useEffect(() => { // what we want to do when the application loads up
        if (activityRegistry.size<=1) loadActivities();
    }, [loadActivities,activityRegistry.size]) // Dependencies inside an array - only fires once.


    if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />


    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>
    )
})