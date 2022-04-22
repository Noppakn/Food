import React from "react";
import '../css/login.css'
import Logo from '../img/logo.png'
const Login = () => {
    
    return (
        <div className="login-container">
            <div className="login-header">
                <h1> เข้าสู่ระบบ </h1>
            </div>
            <div className="login-content">
                <img src= { Logo } className="logo-img"></img>
                <h1>เข้าสู่ระบบ</h1>
                <input placeholder="ชื่อผู้ใช้" className="user-input"></input>
                <input placeholder="รหัสผ่าน" className="password-input"></input>
                <button className="confirm-btn">ยืนยัน</button>
            </div>
        </div>
    )
}

export default Login;