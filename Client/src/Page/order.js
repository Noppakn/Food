import React from "react";
import {useEffect, useState} from "react";
import "../css/order.css"
const Order = () => {
     
    return (
        <div className="login-container">
            <div className="login-header">
                <h1> การแจ้งเตือน </h1>
            </div>
            <div className="order-content">
                <h1>รายการสั่งอาหาร</h1>
                <table >
                        <thead>
                            <tr>
                            <th scope="col">ผู้สั่ง</th>
                            <th scope="col">รายการอาหาร</th>                
                            <th scope="col">ราคา</th>
                            <th scope="col">สถานะ</th>
                            </tr>
                        </thead>
                        <tbody>  
                                   
                        </tbody>
                    </table>
            </div>
        </div>
    )
}

export default Order;