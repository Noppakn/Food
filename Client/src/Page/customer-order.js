import React,{ useEffect, useState } from "react";
import "../css/customer-order.css"
import { useLocation } from 'react-router-dom'

const CustomerOrder = () => {
    const location = useLocation()
    const data = location.state
    const table = data.table
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
          }, 20000); 
        
    }, [])
    console.log(orders)
    return (
        <div className="customer-order-container">
            <div className="header">
                    <h1>Pizza Monkey </h1>
            </div>
            <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">รายการอาหาร</th>
                            <th scope="col">สถานะ</th>                
                            
                            </tr>
                        </thead>
                        <tbody>  
                            {orders.map(i => {
                                if (i.table === table) {
                                    return (<tr>
                                        <td><ul>
                                            {i.menu.map(j => {
                                                return (<li>{j[0]} x {j[1]}  {j[2] === "accept" && <p className="text-success">{j[2]}</p>}
                                                                             { j[2] === "cancel" && <p className="text-danger">{j[2]}</p>}</li>)
                                        })} </ul></td>
                                        <td>{i.order_status === 0 && <button className="btn btn-warning" >รอดำเนินการ</button>}
                                            {i.order_status === 1 && <button className="btn btn-danger">ถูกยกเลิก</button>}
                                            {i.order_status === 2 && <button className="btn btn-info">กำลังจัดเตรียมอาหาร</button>}
                                            {i.order_status === 3 && <button className="btn btn-success">ให้บริการแล้ว</button>}</td>
                                    </tr>)
                                }
                            })}               
                        </tbody>
                    </table>
        </div>
        
        
    )
}

export default CustomerOrder;