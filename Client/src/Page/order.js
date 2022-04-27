import React from "react";
import {useEffect, useState} from "react";
import "../css/order.css"
const Order = () => {
    const [orders, setOrders] =useState([])
    const success = (data) => {
        console.log(data)
        data.order_status = 3
        const newval = [...orders]
        setOrders(newval)
    }
    const cooking = (data) => {
        console.log(data)
        data.order_status = 2
        const newval = [...orders]
        setOrders(newval)
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
    )
}

export default Order;