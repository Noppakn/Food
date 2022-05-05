
import React,{ useEffect, useState} from "react";
import '../css/admin-home.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import swal from 'sweetalert'
import EventsCard from "../event/eventcardd";
import {useLocation} from 'react-router-dom';
import { Link } from "react-router-dom";

const AdminHome = () => {
    const location = useLocation();
    const check = () => {
        if (location.state) {
            
        } else {
            window.location.href = '/'
        }
    }
    const [users, setUser] =useState([])
    const [username, setUsername] =useState([])
    const [role, setRole] =useState([])
    const [password, setPass] =useState([])
    const [conpass, setCon] =useState([])
    const [erole, seteRole] =useState([])
    const [showmenu,setShowmenu] = useState(false)
    const [showuser,setShowuser] = useState(true)
    const [showtable,setShowtable] = useState(false)
    const [showpass,setShowpass] = useState(false)
    const [showre,setShowre] = useState(false)
    const options = [
        { value: 'admin', label: 'admin' },
        { value: 'employee', label: 'emplyee' }    
      ];
    
    const getUser = async() => {
        try {
            
            const response = await fetch("http://localhost:3001/user")
            const jsonData = await response.json()

            setUser(jsonData)
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => {
        getUser();
        getTable();
        check();
        getMenu();
        getPromotion();
        
    }, [])
    const insertTable = () => {
        const bodyTable = {
            'username' : username,
            'password' : password,
            'role' : role
        }
        axios.post("http://localhost:3001/loginn",bodyTable, {
            headers: {
                'content-type': 'application/json',
            }}) 
        toast.success("เพิ่มพนักงาน!",{
            position: toast.POSITION.TOP_RIGHT
            })
        
        window.location.reload(false);
    }
    const deleteTable = (user) => {
        const bodyTable = {
            'username' : user,
            
        }
        swal({
            title: "Confirm Delete?",
            
            buttons: true,
            dangerMode: true,
        }).then((conf) => {
            if (conf) {
                axios.delete('http://localhost:3001/delete-user', {
            headers: {
                'Content-Type': 'application/json',
            },
            data: bodyTable
            })
            }
            window.location.reload(false);
        }      
        )
        
        
    }
    const insertUser = () => {
        if (username.length === 0) {
            toast.error("โปรดกรอก Username",{
                position: toast.POSITION.TOP_RIGHT
                })
            
        } else if (role.length === 0){
            toast.error("โปรดกรอก Role",{
                position: toast.POSITION.TOP_RIGHT
                })
        } else if (password.length === 0){
            toast.error("โปรดกรอก Password",{
                position: toast.POSITION.TOP_RIGHT
                })
        } else if (conpass.length === 0){
            toast.error("โปรดกรอก Confirm Password",{
                position: toast.POSITION.TOP_RIGHT
                })
        } else if (password !== conpass) {
            toast.error("Password ไม่ตรงกัน",{
                position: toast.POSITION.TOP_RIGHT
                })
        } else {
            let check = true
            users.map(i => {
                if (i.username === username) {
                    check = false                  
                }
            
            })
            if (check) {
                insertTable()
            } else {
                toast.error("Username ถูกใช้ไปแล้ว",{
                    position: toast.POSITION.TOP_RIGHT
                    })
            }            
        }
        
    }
    const editUser = (user) => {
        const bodyTable = {
            'username' : user,
            'role' : erole
        }
        axios.put("http://localhost:3001/loginn",bodyTable, {
            headers: {
                'content-type': 'application/json',
            }})
            window.location.reload(false);}
        
     // เปลี่ยนรหัส
    const [oldpassword,setOld] = useState([''])
    const [newpassword,setNew] = useState([''])
    const [connewpassword,setConNew] = useState([''])
    
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
    
    // table
    const [tables,setTable] = useState([])
    const [tablee,setT] = useState([])
    const [sta,setSta] = useState([])
    const getTable = async() => {
        try {
            
            const response = await fetch("http://localhost:3001/table-info")
            const jsonData = await response.json()

            setTable(jsonData)
        } catch (error) {
            console.error(error.message)
        }
    }
    const changeSta = () => {
        if (tablee.length === 0 ) {
            toast.error("กรุณาเลือกโต๊ะ",{
                position: toast.POSITION.TOP_RIGHT
                })
        } else if (sta.length === 0) {
            toast.error("กรุณาเลือกสถานะ",{
                position: toast.POSITION.TOP_RIGHT
                })
        } else {
            const bodyTable = {
                'sta' : sta,
                'table' : tablee
            }
            axios.put("http://localhost:3001/update-table-infoo",bodyTable, {
                headers: {
                    'content-type': 'application/json',
                }}).then(conf => {
                    if(conf) {
                        toast.success("เปลี่ยนสถานะสำเร็จ",{
                            position: toast.POSITION.TOP_RIGHT
                            })
                            getTable()
                    }
                })
                    
                
        }

        
        
    }
    const showuserset = () => {
        setShowuser(true)
        setShowmenu(false)
        setShowtable(false)
        setShowpass(false)
        setShowre(false)
    }
    const showmenuset = () => {
        setShowuser(false)
        setShowmenu(true)
        setShowtable(false)
        setShowpass(false)
        setShowre(false)
    }
    const showtableset = () => {
        setShowuser(false)
        setShowmenu(false)
        setShowtable(true)
        setShowpass(false)
        setShowre(false)
    }
    const showpassset = () => {
        setShowuser(false)
        setShowmenu(false)
        setShowtable(false)
        setShowpass(true)
        setShowre(false)
    }
    const showreset = () => {
        setShowuser(false)
        setShowmenu(false)
        setShowtable(false)
        setShowpass(false)
        setShowre(true)
    }
    
    //menu
    const [menus, setMenu] =useState([])
    const [promotion, setPromotion] =useState([])
    const [menuname, setMenuname] = useState([])
    const [menuprice, setMenuprice] = useState([])
    const [Proname, setProname] = useState([])
    const [Proprice, setProprice] = useState([])
    const [Prodes, setProdes]= useState([])
    const [month, setMonth] =useState([])
    const [year, setYear] =useState([])
    const getMenu = async() => {
        try {
            
            const response = await fetch("http://localhost:3001/menu")
            const jsonData = await response.json()

            setMenu(jsonData)
        } catch (error) {
            console.error(error.message)
        }
    }
    const getPromotion = async() => {
        try {
            
            const response = await fetch("http://localhost:3001/promotion")
            const jsonData = await response.json()

            setPromotion(jsonData)
        } catch (error) {
            console.error(error.message)
        }
    }
    const insertMenu = () => {
        if (menuname.length === 0) {
            toast.error("โปรดกรอกชื่อเมนู",{
                position: toast.POSITION.TOP_RIGHT
                })
            
        } else if (menuprice.length === 0){
            toast.error("โปรดกรอกราคา",{
                position: toast.POSITION.TOP_RIGHT
                })
        } else {
            let check = true
            menus.map(i => {
                if (i.food === menuname) {
                    check = false                  
                }           
            })
            if (check) {
                insertTablee()
            } else {
                toast.error("เมนูมีอยู่แล้ว",{
                    position: toast.POSITION.TOP_RIGHT
                    })
            }            
        }
        
    }
    const insertPro = () => {
        if (Proname.length === 0) {
            toast.error("โปรดกรอกชื่อโปรโมชั่น",{
                position: toast.POSITION.TOP_RIGHT
                })
            
        } else if (Prodes.length === 0){
            toast.error("โปรดกรอกรายละเอียด",{
                position: toast.POSITION.TOP_RIGHT
                })
        }else if (Proprice.length ===0){
            toast.error("โปรดกรอกราคา",{
                position: toast.POSITION.TOP_RIGHT
                })
        } 
        else {
            let check = true
            promotion.map(i => {
                if (i.food === Proname) {
                    check = false                  
                }           
            })
            if (check) {
                insertTableee()
            } else {
                toast.error("โปรโมชั่นมีอยู่แล้ว",{
                    position: toast.POSITION.TOP_RIGHT
                    })
            }            
        }
        
    }
    const insertTablee = () => {
        const bodyTable = {
            'food' : menuname,
            'price' : menuprice
            
        }
        axios.post("http://localhost:3001/insert-menu",bodyTable, {
            headers: {
                'content-type': 'application/json',
            }}) 
        toast.success("เพิ่มเมนู!",{
            position: toast.POSITION.TOP_RIGHT
            })
        
        getMenu()
    }
    const deleteTablee = (menu) => {
        const bodyTable = {
            'food' : menu,
            
        }
        swal({
            title: "Confirm Delete?", 
            buttons: true,
            dangerMode: true,
        }).then((conf) => {
            if (conf) {
                axios.delete('http://localhost:3001/delete-menu', {
            headers: {
                'Content-Type': 'application/json',
            },
            data: bodyTable
            })
            }
            getMenu()
        }      
        )
        
        
    }
    const insertTableee = () => {
        const bodyTable = {
            'food' : Proname,
            'description' : Prodes,
            'price' : Proprice
            
            
        }
        axios.post("http://localhost:3001/insert-pro",bodyTable, {
            headers: {
                'content-type': 'application/json',
            }}) 
        toast.success("เพิ่มโปรโมชั่น!",{
            position: toast.POSITION.TOP_RIGHT
            })
        
        getPromotion()
        
    }
    const deleteTableee = (menu) => {
        const bodyTable = {
            'food' : menu,
            
        }
        swal({
            title: "Confirm Delete?", 
            buttons: true,
            dangerMode: true,
        }).then((conf) => {
            if (conf) {
                axios.delete('http://localhost:3001/delete-pro', {
            headers: {
                'Content-Type': 'application/json',
            },
            data: bodyTable
            })
            }
            getPromotion()
        }      
        )
        
        
    }
    const reportgo = () => {
        console.log(month,year)
        if (month.length ===0) {
            toast.error("โปรดเลือกเดือน",{
                position: toast.POSITION.TOP_RIGHT
                })
        } else if (year.length === 0 ) {
            toast.error("โปรดเลือกปี",{
                position: toast.POSITION.TOP_RIGHT
                })
        } else if (month === "มีนาคม" & year === "2565") {
            window.open("/reasokasdpok56521324", "_blank")
        } else {
            toast.error("ไม่พบข้อมูล",{
                position: toast.POSITION.TOP_RIGHT
                })
        }
    }
    return(
        <div className="admin-container">
            <div className="admin-left"> 
                <h1>Pizza Monkey admin</h1>
                <button onClick={() =>showuserset()}>จัดการบัญชีผู้ใช้</button>
                <button onClick={() =>showmenuset()}>จัดการเมนูอาหาร</button>
                <button onClick={() =>showtableset()}>จัดการโต๊ะ</button>
                <button onClick={() =>showreset()}>รายงาน</button>
                <button onClick={() =>showpassset()}>เปลี่ยนรหัสผ่าน</button>
                <button onClick={() => window.location.href = '/'}>ออกจากระบบ</button>
            </div>
        
            {showuser ? <div className="admin-right">
                <div className="user-mgt">
                    <h2>จัดการบัญชีผู้ใช้</h2>
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-3">
                            <label for="inputEmail4">Username</label>
                            <input type="email" class="form-control" id="inputEmail4" placeholder="Username" onChange={event => setUsername(event.target.value)}/>
                            </div>
                            <div class="form-group col-md-3">
                            <label for="inputState">Role</label>
                            <select id="lang" class="form-control" onChange={event => setRole(event.target.value)} value={role}>
                                <option value="" disabled selected>Select role</option>               
                                <option value="admin">Admin</option>
                                <option value="employee">Employee</option>
                            </select>
                            </div> 
                            <div class="form-group col-md-3">
                            <label for="inputPassword4">Password</label>
                            <input type="password" class="form-control" id="inputPassword4" placeholder="Password" onChange={event => setPass(event.target.value)}/>
                            </div>
                            <div class="form-group col-md-3">
                            <label for="inputPassword4">Confirm Password</label>
                            <input type="password" class="form-control" id="inputPassword4" placeholder="Password" onChange={event => setCon(event.target.value)}/>
                            </div>
                            
                        </div>
                        
                    </form>
                    <button onClick={() => insertUser()} className="btn btn-success">เพิ่มพนักงาน</button>
                    <table class="table table-borderless table-sm">
                        <thead>
                            <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Role</th>                
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>  
                            {users.map( user => (                     
                                <tr> 
                                    <td>{user.username}</td>
                                    <td>{user.role}</td>
                                    <td><Popup
                                            trigger={<button className="btn btn-warning" > Edit </button>}
                                            modal
                                            nested>
                                                {close => {
                                                    
                                                    
                                                    return(
                                                        <div>
                                                        <form>
                                                        <div class="form-row">
                                                            <div class="form-group col-md-3">
                                                            <label for="inputEmail4">Username</label>
                                                            <input type="email" class="form-control" id="inputEmail4" placeholder="Username" value={user.username} disabled/>
                                                            </div>
                                                            <div class="form-group col-md-3">
                                                            <label for="inputState">Role</label>
                                                            <select id="lang" class="form-control" onChange={event => seteRole(event.target.value)} value={erole}>
                                                                <option value="" disabled selected>Select role</option>               
                                                                <option value="admin">Admin</option>
                                                                <option value="employee">Employee</option>
                                                            </select>
                                                            </div> 
                                                            
                                                            
                                                        </div>
                                                        
                                                    </form>
                                                    <button onClick={() => editUser(user.username) } className="btn btn-warning">Edit</button>
                                                    </div>
      
                                                )}}
                                        </Popup>
                                    </td>
                                    <td><button onClick={() => deleteTable(user.username)} className="btn btn-danger">Delete</button></td>
                                </tr>
                            ))}               
                        </tbody>
                    </table>
                </div>
            
            </div>:null}
            {showpass?<div className="admin-right">
                <div className="change"><h1>เปลี่ยนรหัสผ่าน</h1>
                <p>รหัสผ่านเก่า</p>
                <input type="password"class="form-group col-md-3" onChange={event => setOld(event.target.value)}></input>
                <p>รหัสผ่านใหม่</p>
                <input type="password"class="form-group col-md-3" onChange={event => setNew(event.target.value)} ></input>
                <p >ยืนยันรหัสผ่านใหม่</p>
                <input type="password"class="form-group col-md-3" onChange={event => setConNew(event.target.value)}></input>
                <p></p>
                <button className="btn btn-success" onClick={() => changePass()}>ยืนยัน</button>
                </div>
            </div>:null}
            {showtable?<div className="admin-right">
                <div className="changetable">
                <h1>เปลี่ยนสถานะ</h1>
                    <p>โต๊ะ</p>
                    <select id="lang" class="form-control col-md-3 text-center" onChange={event => setT(event.target.value)}>
                        <option value="" disabled selected>เลือกโต๊ะ</option>
                        {tables.map(i => (
                            <option value={i.table}>{i.table}</option>
                        ))}                              
                    </select>
                    <p>สถานะ</p>
                    <select id="lang" class="form-control col-md-3 text-center" onChange={event => setSta(event.target.value)} >
                        <option value="" disabled selected>เลือกสถานะ</option>
                        <option value={0} >ปกติ</option>
                        <option value={1} >ปิดปรับปรุง</option>                                
                    </select>
                    <button className="btn btn-success" onClick={() => changeSta()}>ยืนยัน</button>
                    <EventsCard data={tables} />
                    
                </div>

            </div>:null}
            {showmenu? <div>
                <div className="admin-right">
                    <div className="user-mgt">
                    <h1>จัดการเมนู</h1>
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-3">
                            <label for="inputEmail4">ชื่อเมนู</label>
                            <input type="email" class="form-control" id="inputEmail4" placeholder="ช่ือเมนู" onChange={event => setMenuname(event.target.value)}/>
                            </div>
                            <div class="form-group col-md-3">
                            <label for="inputPassword4">ราคา</label>
                            <input type="number" class="form-control" id="inputPassword4" placeholder="ราคา" onChange={event => setMenuprice(event.target.value)}/>
                            </div> 
                        </div>
                    </form>
                    <button onClick={() => insertMenu()} className="btn btn-success">เพิ่มเมนู</button>
                    <table class="table table-borderless table-sm">
                        <thead>
                            <tr>
                            <th scope="col">เมนู</th>
                            <th scope="col">ราคา</th>                
                            <th scope="col">ลบ</th>
                            </tr>
                        </thead>
                        <tbody>  
                            {menus.map( menu => (                     
                                <tr> 
                                
                                <td className="menu-name align-middle text-center w-50"><p>{menu.food}</p></td>
                                <td className="menu-name align-middle text-center w-50">{menu.price} B.</td>
                                <button onClick={() => deleteTablee(menu.food)} className="btn btn-danger">ลบ</button>
                                </tr>
                            ))}               
                        </tbody>
                    </table>
                    <h1>จัดการโปรโมชั่น</h1>
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-3">
                            <label for="inputEmail4">ชื่อโปรโมชั่น</label>
                            <input type="email" class="form-control" id="inputEmail4" placeholder="ช่ือเมนู" onChange={event => setProname(event.target.value)}/>
                            </div>
                            <div class="form-group col-md-3">
                            <label for="inputPassword4">รายละเอียด</label>
                            <input type="text" class="form-control" id="inputPassword4" placeholder="รายละเอียด" onChange={event => setProdes(event.target.value)}/>
                            </div> 
                            <div class="form-group col-md-3">
                            <label for="inputPassword4">ราคา</label>
                            <input type="number" class="form-control" id="inputPassword4" placeholder="ราคา" onChange={event => setProprice(event.target.value)}/>
                            </div> 
                        </div>
                    </form>
                    <button onClick={() => insertPro()} className="btn btn-success">เพิ่มโปรโมชั่น</button>
                    <table class="table table-borderless table-sm">
                        <thead>
                            <tr>
                            <th scope="col">เมนู</th>
                            <th scope="col">รายละเอียด</th>
                            <th scope="col">ราคา</th>                 
                            <th scope="col">ลบ</th>
                            </tr>
                        </thead>
                        <tbody>  
                            {promotion.map( menu => (                     
                                <tr> 
                                
                                <td className="menu-name align-middle text-center w-40"><p>{menu.food}</p></td>
                                <td className="menu-name align-middle text-center w-50">{menu.description}</td>
                                <td className="menu-name align-middle text-center w-30">{menu.price} B.</td>
                                <button onClick={() => deleteTableee(menu.food)} className="btn btn-danger">ลบ</button>
                                </tr>
                            ))}               
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>:null}
            {showre? <div className="admin-right">
                <div className="report">
                    <h1>รายงาน - เดือน</h1>
                    <p>เดือน</p>
                    <select id="lang" class="form-control col-md-3" onChange={event => setMonth(event.target.value)} >
                                <option value="" disabled selected>เลือกเดือน</option>               
                                <option >มกราคม</option>
                                <option >กุมภาพันธ์</option>
                                <option >มีนาคม</option>
                                <option >เมษายน</option>
                                <option >พฤษภาคม</option>
                                <option >มิถุนายน</option>
                                <option >กรกฎาคม</option>
                                <option >สิงหาคม</option>
                                <option >กันยายน</option>
                                <option >ตุลาคม</option>
                                <option >พฤศจิกายน</option>
                                <option >ธันวาคม</option>
                    </select>
                    <p>ปี</p>
                    <select id="lang" class="form-control col-md-3" onChange={event => setYear(event.target.value)} >
                                <option value="" disabled selected>เลือกปี</option>               
                                <option >2561</option>
                                <option >2562</option>
                                <option >2563</option>
                                <option >2564</option>
                                <option >2565</option>
                                <option >2566</option>
                                
                    </select>
                    
                    </div>
                    <button className="btn btn-primary" onClick={() => reportgo()}>ดูรายงาน</button>
                    
                    
                </div>:null}
            <ToastContainer />  
        </div>
    )
}

export default AdminHome;