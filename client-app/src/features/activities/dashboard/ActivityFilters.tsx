import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function ActivityFilters(){
    return (
        <>
        <Menu vertical suze='large' style={{width:'100%',marginTop: 25}}>
            <Header icon='filter' attached color='teal' content='Filters' />
            <Menu.Item content='all Activities'/>
            <Menu.Item content="I'm going"/>
            <Menu.Item content="I'm hosting"/>
        </Menu>
        <Header/>
        <Calendar/>
    </>
    )
}