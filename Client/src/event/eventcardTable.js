import React from "react";
import CardTable from "../component/cardTable";
import { Link } from "react-router-dom";
export default function EventsTableList(props) {
  const eventsTableList = props.data.map(event => (

    <CardTable
        table={event.table}
        table_id={event.order_id}
        status={event.status}/>
    
  ));
  
  return <div>{eventsTableList}</div>;
}