import React,{ useEffect, useState} from "react";
import axios from 'axios'
import Navbar from "../component/navbar";
import {useLocation} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const Changepassword =() => {
    const location = useLocation();
    const [oldpassword,setOld] = useState([''])
    const [newpassword,setNew] = useState([''])
    const [connewpassword,setConNew] = useState([''])
    console.log(location.state.data.username)
    const changePass = () => {
        
        const bodyTable = {
            'username' : location.state.data.username,
            'password' : oldpassword,
            'newpassword' : newpassword
        }
        if (newpassword !== connewpassword) {
            toast.error("รหัสผ่านใหม่ไม่ตรงกัน",{
                position: toast.POSITION.TOP_RIGHT
                })
        } else {
            axios.put("http://localhost:3001/login",bodyTable, {
            headers: {
                'content-type': 'application/json',
            }}).then(conf => {
                if (conf.data === "user or password doesn't match") {
                    toast.error("รหัสผ่านเก่าไม่ถูกต้อง",{
                        position: toast.POSITION.TOP_RIGHT
                        })
                } else {
                    toast.success("เปลี่ยนรหัสผ่านสำเร็จ",{
                        position: toast.POSITION.TOP_RIGHT
                        })
                }
            })
        }   
    }
    return (
        <div>
        < Navbar data={location.state.data}/>
        <div className="login-container">
        <div className="change1"><h1>เปลี่ยนรหัสผ่าน</h1>
                <p>รหัสผ่านเก่า</p>
                <input type="password"className="form-group col-md-3" onChange={event => setOld(event.target.value)}></input>
                <p>รหัสผ่านใหม่</p>
                <input type="password"className="form-group col-md-3" onChange={event => setNew(event.target.value)} ></input>
                <p >ยืนยันรหัสผ่านใหม่</p>
                <input type="password"className="form-group col-md-3" onChange={event => setConNew(event.target.value)}></input>
                <p></p>
                <button className="btn btn-success" onClick={() => changePass()}>ยืนยัน</button>
                </div>
        </div>
        </div>
    )
}
export default Changepassword;