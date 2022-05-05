import React from "react";
import Card from "../component/card";

export default function EventsList(props) {
  const eventsList = props.data[0].map(event => (
    event.order_status === 0 &&
    <Card
        table={event.table}
        order={event.menu}
        status={event.order_status}
        order_id={event.order_id}
        user = {props.data[1]}/>
    
  ));
  
  return <div>{eventsList}</div>;
}