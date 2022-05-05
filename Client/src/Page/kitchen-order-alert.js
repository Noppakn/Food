import React,{ useEffect, useState } from "react";
import EventsCard from "../event/eventcard";
import Navbar from "../component/navbar";
import {useLocation} from 'react-router-dom';

import "../css/kitchen-order-alert.css"




export default function KitchenOrderAlert(props) {
    const location = useLocation();
    const [orders, setOrders] =useState([])
    const refreshWin = async() => {
        window.location.reload(false);
    }
    console.log(props)
    const getOrder = async() => {
        try {
            
            const response = await fetch("http://localhost:3001/admin-order")
            const jsonData = await response.json()
            setOrders(jsonData)             
        } catch (error) {
            console.error(error.message)
        }
    }
    
    useEffect(() => {
        getOrder()
        const interval = setInterval(() => {
            refreshWin();
          }, 5000);
        
    }, [])
    return (
        <div>
            < Navbar data={location.state.data}/>
        <div className="kitchen-order-alert-container">
            <EventsCard data={[orders,location.state.data]} />
        </div>
        </div>
    )
} ;