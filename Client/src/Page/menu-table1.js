import React,{Fragment, useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GiShoppingCart } from 'react-icons/gi'
import { RiShoppingBag3Line } from 'react-icons/ri'
import { SiAirtable } from 'react-icons/si'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { MdMenuBook } from 'react-icons/md'
import swal from 'sweetalert'
import  P1  from '../img/P1.png'
import  P2  from '../img/P2.png'
import  P3  from '../img/P3.png'
import  bg  from '../img/bg.png'
import '../css/listmenu.css'
import axios from 'axios'
import { Link } from "react-router-dom";



const Menu = () => {
    const baseUrl = "http://localhost:3001/create-order" ;
    const table = 1
    const [promotion, setPromotion] =useState([])
    const [menus, setMenu] =useState([])
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState({
        subtotal: 0,
        vat : 0,
        total: 0
    })
    const [showmenu,setShowmenu] = useState(true)
    const [showorder,setShoworder] = useState(false)
    
    
    const checkOrder = () => {

    }
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

    function addtocart(item) {
        menus.map((i) => {
            if (i.food_id === item.food_id) {
                i.check_cart = true
            } 
            item.quantity = 1
            item.total = item.price * item.quantity
            setCart([...cart, item]);       
        })
        
    }
    function addtocartPro(item) {
        promotion.map((i) => {
            if (i.food_id === item.food_id) {
                i.check_cart = true
            } 
            item.quantity = 1
            item.total = item.price * item.quantity
            setCart([...cart, item]);      
        })
        
    }
    function increase(item) {
        item.quantity + 1 === 11 ? (
            console.log("no")
        ) :
            item.quantity = item.quantity + 1
            item.total = item.quantity * item.price
            const newval = [...cart]
            setCart(newval)
            totalcal()

    }
    function decrease(item) {
        item.quantity - 1 <= 0 ? (
            console.log("no")
        ) : 
            item.quantity = item.quantity - 1
            item.total = item.quantity * item.price
            const newval = [...cart]
            setCart(newval)
            totalcal()
            
            
        }
    function round(value, step) {
        step || (step = 1.0);
        var inv = 1.0/ step;
        return Math.round(value * inv) / inv;
    }
    const totalcal = () => {
        
        let sub_t = 0
        let vat = 0
        let t = 0
        cart.map((i) => {
            sub_t = sub_t + i.total
        })
        vat = round(sub_t * 0.07,0.50)
        t = vat +  sub_t
        setTotal({
            subtotal:sub_t.toFixed(2),
            vat:vat.toFixed(2),
            total:t.toFixed(2)
        })
    }
    useEffect(() => {
        getMenu();
        getPromotion()
    }, [])
    
    const pic = [P1,P2,P3]
    const notify = (e) => {
        const name = e.target.getAttribute("name")
        setCart(cart.filter(item => item.food !== name));
        menus.map((i) => {
        if (i.food === name) {
            i.check_cart = false
            i.total = i.price
        }
        promotion.map((i) => {
            if (i.food === name) {
                i.check_cart = false
                i.total = i.price
            } 
        })
    })
    promotion.map((i) => {
        if (i.food === name) {
            i.check_cart = false
            i.total = i.price
        } 
    })}

    const scrollToCart = () => {
        if (cart.length === 0) {
            toast.error('Order is empty!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });;
        }else{
            setShowmenu(false)
            setShoworder(true)
            totalcal()
        }
        
    }
    const scrollToMenu = () => {
        setShowmenu(true)
        setShoworder(false)
    }

function reset() {
    if (cart.length === 0) {
        toast.error('Order is already empty!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });; 
        }else {
            setCart(cart.filter(item => item.food === "name"));
            menus.map((i) => {
                if (i.check_cart === true) {
                    i.check_cart = false
                    i.total = i.price
                } 
            })
            promotion.map((i) => {
                if (i.check_cart === true) {
                    i.check_cart = false
                    i.total = i.price
                } 
            })
        }
   
}
const confirmAlert =() => {
    if (cart.length === 0) {
        toast.error('Order is empty!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });;
    } else {
        let t = 0
        cart.map((c) => {
            t = t + c.total
        })
        swal({
            title: "[Table 1] Confirm order",
            text : "total :" + total.total,
            buttons: true,
            dangerMode: true,
        }).then((conf) => {
            if (conf) {
                swal("Ordered!", {
                    icon : "success"
                })
                menus.map((i) => {
                if (i.check_cart === true) {
                    i.check_cart = false
                    i.total = i.price
                }               
                })
                promotion.map((i) => {
                    if (i.check_cart === true) {
                        i.check_cart = false
                        i.total = i.price
                    }               
                    })
                let sumorder = []
                cart.map((c) => {
                    let h = []
                    h.push(c.food)
                    h.push(c.quantity)
                    h.push("pending")
                    h.push(c.price)
                    sumorder.push(h)
                    
                })
                console.log(sumorder)
                const body = {
                    'table' : table,
                    'total' : total.total,
                    'menu' : sumorder
                }
                axios.post(baseUrl,body, {
                    headers: {
                        'content-type': 'application/json',
                    }})
                
                setCart(cart.filter(item => item.food === "name"));
                scrollToMenu()

            }
        })
            
        
    }
}

    const callem = () =>{
        swal({
            title: "เรียกพนักงาน",
            buttons: true,
            dangerMode: true,
        }).then((conf) => {
            if (conf) {const bodyTable = {
                'status' : 2,
                'table' : table
            }
            axios.put("http://localhost:3001/update-table-info",bodyTable, {
                headers: {
                    'content-type': 'application/json',
                }
            })}
        }
        )}
    const checkbill = () =>{
        swal({
            title: "จ่ายเงิน",
            buttons: true,
            dangerMode: true,
        }).then((conf) => {
            if (conf) {const bodyTable = {
                'status' : 3,
                'table' : table
            }
            axios.put("http://localhost:3001/update-table-info",bodyTable, {
                headers: {
                    'content-type': 'application/json',
                }
            })}
        }
        )
    }
    return (<div>
        {showmenu?<div>
            <div className="header">
                <h1>Pizza Monkey </h1>
            </div>
            <ul class="nav nav-pills  nav-justified" id="pills-tab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="pills-all-tab" data-toggle="pill" href="#pills-all" role="tab" aria-controls="pills-all" aria-selected="true">All</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="pills-promotion-tab" data-toggle="pill" href="#pills-promotion" role="tab" aria-controls="pills-promotion" aria-selected="false">Promotion</a>
                </li>
                        
                </ul>
                <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab">
                    <table class="table table-borderless table-sm">
                        <thead>
                            <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>                
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>  
                            {menus.map( menu => (                     
                                <tr> 
                                <td className="w-0"><img src={menu.pic} className="menu-pic"/></td>
                                <td className="menu-name align-middle text-center w-50"><p className="name">{menu.food}</p>{menu.price} B.</td>
                                <td className="align-middle w-30">{ menu.check_cart === false  && <button onClick={() => {addtocart(menu)}} className="btn-add" >Add</button> }
                                    { menu.check_cart === true  && <button className="btn-added" name={menu.food} onClick={notify}>Added</button> }
                                </td>
                                </tr>
                            ))}               
                        </tbody>
                    </table>
                </div>
                <div class="tab-pane fade" id="pills-promotion" role="tabpanel" aria-labelledby="pills-promotion-tab">
                    <table class="table table-borderless table-sm">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col"></th>              
                                
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>  
                            {promotion.map( (menu,index) => (                     
                                <tr> 
                                    <td className="w-0"><img src={ pic[index] } className="menu-pic"/></td> 
                                    <td className="menu-name align-middle text-center w-50"><p className="name">{menu.food}</p><p>{menu.description}</p><p>{menu.price} B.</p></td>
                                    <td className="align-middle w-30">{ menu.check_cart === false  && <button onClick={() => addtocartPro(menu)} className="btn-add" >Add</button> }
                                        { menu.check_cart === true  && <button className="btn-added" name={menu.food} onClick={notify}>Added</button> }
                                    </td>
                                </tr>
                            ))}               
                        </tbody>
                    </table>
                </div>
                
                </div>
            <div className="cart-container" >                    
                <button type="button" onClick={scrollToCart} className="cart-btn">
                        {<GiShoppingCart className="cart-logo"/>} ×{cart.length}
                </button>
                <Link to ="/customer-order" state={{ table :table }}>
                    <button type="button"  className="cart-btn">เช็คออเดอร์</button>
                </Link>
                
                <button type="button"  className="cart-btn" onClick={() => callem()} >เรียกพนักงาน</button>
                <button type="button"  className="cart-btn" onClick={() => checkbill()} >จ่ายเงิน</button>
            
            </div>
        </div>:null}

        {showorder?<div className="cart-order-contrainer" style={{ backgroundImage: `url(${bg})` , backgroundSize: "cover"}}>
            <div className="order">
                <div>
                    <h1>Your order</h1>
                    <p>{<RiShoppingBag3Line/>} {cart.length}</p>
                </div>
                <div className="order-table">
                    <h1 className="order-table-h1">{<SiAirtable/>} Table {table} </h1>
                </div>
                <table class="tableOrder table-borderless table-sm">
                    <thead>
                        <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map( i => (
                            <tr>
                            <td className='align-middle' ><img src={i.pic} className="menu-pic"/></td>
                            <td className='align-middle' >{i.food}</td>                     
                            <td className='align-middle' ><button className="btn-inde btn-light" onClick={() => decrease(i)}>-</button>     {i.quantity}     <button className="btn-inde btn-light" onClick={() => increase(i)}>+</button></td>
                            <td className='align-middle' >{i.total}</td>
                            </tr>
                        ))}               
                    </tbody>
                </table>
                <div className="order-total">
                    <table class="tableOrder table-borderless table-sm">
                        <thead>
                            <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-left" style={{fontSize:"14px",fontWeight:"bold"}}>Subtotal</td>
                                <td className="text-right" style={{fontSize:"14px"}}>{total.subtotal}</td>
                            </tr>
                            <tr>
                                <td className="text-left" style={{fontSize:"14px",fontWeight:"bold"}}>Vat 7%</td>
                                <td className="text-right" style={{fontSize:"14px"}}>{total.vat}</td>
                            </tr>
                            <tr>
                                <td className="text-left" style={{fontSize:"20px",fontWeight:"bold"}}>Total</td>
                                <td className="text-right" style={{fontSize:"20px",fontWeight:"bold"}}>{total.total}</td>
                            </tr>              
                        </tbody>
                        </table>
                    
                    
                </div>
                <div className="order text-center" >
                    <button className="btn-order "onClick={() => confirmAlert()}  ><span>Order</span> {<AiOutlineArrowRight/>}</button>
                    
                </div>                
            </div>
            <div className="footer">
                <div className="footer-left" href="#" onClick={() =>scrollToMenu()}>
                    <a onClick={() =>scrollToMenu()}>{<MdMenuBook/>}</a>
                    <span>Menu</span>
                </div>
                <div className="footer-right">
                    <a href="#" >{<GiShoppingCart/>}</a>
                    <span>Cart</span>
                </div>
                
            </div>
        </div>:null}
        <ToastContainer />                
        </div>)
};

export default Menu;