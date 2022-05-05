import React from "react";
import "../css/navbar.css"
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export default function Navbar(props) {
    
    const history = useNavigate()
    console.log(props.data)
    return (
        <div className="nav-con">
            <p><FaUserAlt/> {props.data.username}</p>
            <button onClick={() => history("/home", {state:{data: props.data}})}>หน้าหลัก</button>
            <button onClick={() => history("/kitchen-order-alert", {state:{data: props.data}})}>ดูรายละเอียด</button>
            <button onClick={() => history("/order", {state:{data: props.data}})}>สถานะออเดอร์</button>
            <button onClick={() => history("/pass", {state:{data: props.data}})}>เปลี่ยนรหัสผ่าน</button>
            <button onClick={() => window.location.href = '/'}>ออกจากระบบ</button>
        </div>
    )
};