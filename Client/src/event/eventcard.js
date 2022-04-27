import React from "react";
import Card from "../component/card";

export default function EventsList(props) {
  const eventsList = props.data.map(event => (
    event.order_status === 0 &&
    <Card
        table={event.table}
        order={event.menu}
        status={event.order_status}
        order_id={event.order_id}/>
    
  ));
  
  return <div>{eventsList}</div>;
}