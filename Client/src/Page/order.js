import React from "react";
import {useEffect, useState} from "react";
import axios from 'axios'
import "../css/order.css"
import Navbar from "../component/navbar";

const Order = () => {
    
    
    const [orders, setOrders] =useState([])
    const success = (data) => {
        console.log(data)
        data.order_status = 3
        const newval = [...orders]
        setOrders(newval)
        const baseUrl = "http://localhost:3001/update-admin-order"
        const body = {
            'order_status' : 3,
            'menu' : data.menu,
            'order_id' : data.order_id
        }
        axios.put(baseUrl,body, {
            headers: {
                'content-type': 'application/json',
            }})
    }
    const cooking = (data) => {
        console.log(data)
        data.order_status = 2
        const newval = [...orders]
        setOrders(newval)
        const baseUrl = "http://localhost:3001/update-admin-order"
        const body = {
            'order_status' : 2,
            'menu' : data.menu,
            'order_id' : data.order_id
        }
        axios.put(baseUrl,body, {
            headers: {
                'content-type': 'application/json',
            }})
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
    }, [])
    console.log(orders)

    return (
        <div>
            < Navbar />
        <div className="login-container">
            <div className="login-header">
                <h1> การแจ้งเตือน </h1>
            </div>
            <div className="order-content">
                <h1>รายการสั่งอาหาร</h1>
                <table className="tablee table-hover">
                        <thead>
                            <tr>
                            <th className="text-center" scope="col">ผู้สั่ง</th>
                            <th  scope="col">รายการอาหาร</th>                                          
                            <th className="text-center" scope="col">สถานะ</th>
                            </tr>
                        </thead>
                        <tbody>  
                            { orders.map(i => {
                                if (i.order_status === 2 | i.order_status ===3 ) {
                                    return(
                                    <tr>
                                    <td className="text-center" >T{i.table}</td>
                                    <td className="align-middle" ><ul>{i.menu.map(j => {
                                        if (j[2] !== "cancel") {
                                            return <li>{j[0]}</li>
                                        }
                                        
                                    })}</ul></td>
                                    <td className="text-center">{i.order_status === 3 && <button className="btn btn-success" onClick={() => cooking(i)}>ให้บริการแล้ว</button>}
                                    {i.order_status === 2 && <button className="btn btn-warning" onClick={() => success(i)}>กำลังจัดเตรียมอาหาร</button>}
                                        </td>
                                </tr>)
                            }
                                }
                            )}    
                        </tbody>
                    </table>
            </div>
        </div>
        </div>
    )
}

export default Order;