import React from "react";
import '../css/login.css'
import Logo from '../img/logo.png'
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
const Login = () => {
    const history = useNavigate()
    const baseUrl = "http://localhost:3001/login"
    const [username, getUser] = React.useState('');
    const [password, getPass] = React.useState('');
    
    function checklogin() {
        
        const body = {
            'username' : username,
            'password' : password
        }
        axios.post(baseUrl,body, {
            headers: {
                'content-type': 'application/json',
            }}).then(res => {
                if (res.data) {
                        toast.success("Login success!",{
                        position: toast.POSITION.TOP_CENTER
                        })
                        console.log(res.data[0].role)
                        if (res.data[0].role === 'admin') {
                            history("/admin-home", {state:{data: res.data[0]}}); 
                        }else {
                            history("/home", {state:{data: res.data[0]}}); 
                        }
                    
                } else {
                    toast.error("Invalid Username or password!",{
                    position: toast.POSITION.TOP_CENTER
                    })
                }
            })
    }
    return (
        <div className="login-container">
            <div className="login-header">
                <h1> เข้าสู่ระบบ </h1>
            </div>
            <div className="login-content">
                <img src= { Logo } className="logo-img"></img>
                <h1>เข้าสู่ระบบ</h1>
                <input placeholder="ชื่อผู้ใช้" className="user-input" onChange={event => getUser(event.target.value)}></input>
                <input type="password" placeholder="รหัสผ่าน" className="password-input" onChange={event => getPass(event.target.value)}></input>
                <button className="confirm-btn" onClick={checklogin}>ยืนยัน</button>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Login;