import React,{ useEffect, useState } from "react";
import EventsCard from "../event/eventcard";
import Navbar from "../component/navbar";


import "../css/kitchen-order-alert.css"


const KitchenOrderAlert =() => {
    const [orders, setOrders] =useState([])
    const refreshWin = async() => {
        window.location.reload(false);
    }
    
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
            < Navbar />
        <div className="kitchen-order-alert-container">
            <EventsCard data={orders} />
        </div>
        </div>
    )
}

export default KitchenOrderAlert ;