import React from "react";
import { useEffect, useState} from "react";
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import "../css/kitchen-accept-order.css"
const KitchenAcceptOrder = () => {
    const location = useLocation()
    const data = location.state
    const [orders,SetOrder] = useState([])
    const getOrder = async() => {
        data.order.map((i) => {
            console.log(i)
            let e = {order:i[0],quantity:i[1],status:"accept",total:i[3]}
            orders.push(e)
            SetOrder([...orders])
        })
    }
    function cancelOrder(item) {
        item.status = "cancel"
        const newval = [...orders]
        SetOrder(newval)
    }
    function acceptOrder(item) {
        item.status = "accept"
        const newval = [...orders]
        SetOrder(newval)
    }
    const confirmorder = () => {
        let array = []
        orders.map(i => {
            let subA = []
            subA.push(i.order,i.quantity,i.status,i.total)
            array.push(subA)
        })
        console.log(array)
        console.log(data.order_id)
        const baseUrl = "http://localhost:3001/update-admin-order"
        const body = {
            'order_status' : 2,
            'menu' : array,
            'order_id' : data.order_id
        }
        axios.put(baseUrl,body, {
            headers: {
                'content-type': 'application/json',
            }})
            const bodyTable = {
                'status' : 1,
                'table' : data.table
            }
            axios.put("http://localhost:3001/update-table-info",bodyTable, {
                headers: {
                    'content-type': 'application/json',
                }
            })
        window.location.href = '/kitchen-order-alert'  
    }
    useEffect(() => {
        getOrder();
    }, [])
    console.log(orders)
    return (
        <div className="kitchen-accept-order-container">
            <div className="kitchen-accept-order-content">
                <h1>T{data.table}</h1>
                <p className="text-success">Accept Order</p>
                <ul>
                    {orders.map(i => {
                        if (i.status === "accept") {
                            return <li className="order-li"><p>{i.order} x {i.quantity}</p><button className="btn-cancel"onClick={() => cancelOrder(i)}>Cancel</button></li>
                        }                        
                    })}
                </ul>
                <p className="text-danger">Cancel Order</p>
                <ul>
                    {orders.map(i => {
                        if (i.status === "cancel") {
                            return <li className="order-li"><p>{i.order} x {i.quantity}</p><button className="btn-accept"onClick={() => acceptOrder(i)}>Accept</button></li>
                        }                        
                    })}
                </ul>
                <button className="btn-confirm" onClick={()=> confirmorder()}>Confirm</button>
            </div>
            
        </div>
        
        
    )
}

export default KitchenAcceptOrder;