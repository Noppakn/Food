import React,{Fragment, useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GiShoppingCart } from 'react-icons/gi'
import swal from 'sweetalert'
import  P2  from '../img/P2.png'



const Menu = () => {
    const table = 1
    const [promotion, setPromotion] =useState([])
    const [menus, setMenu] =useState([])
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState([0])
    
    

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
                i.check_cart = "true"
            } 
            item.quantity = 1
            item.total = item.price * item.quantity
            setCart([...cart, item]);
            
            
        })
    }
    function addtocartPro(item) {
        promotion.map((i) => {
            if (i.food_id === item.food_id) {
                i.check_cart = "true"
            } 
            item.quantity = 1
            item.total = item.price * item.quantity
            setCart([...cart, item]);
            
            
        })
    }
    function increase(item) {
        item.quantity = item.quantity + 1
        item.total = item.quantity * item.price
        const newval = [...cart]
        setCart(newval)
        
    }
    function decrease(item) {
        item.quantity - 1 <= 0 ? (
            console.log("no")
        ) : 
            item.quantity = item.quantity - 1
            item.total = item.quantity * item.price
            const newval = [...cart]
            setCart(newval)
            
        }
    const removecart = (e) => {
        const name = e.target.getAttribute("name")
        setCart(cart.filter(item => item.food !== name));
        menus.map((i) => {
            if (i.food === name) {
                i.check_cart = "false"
                i.total = i.price
            } 
        })
        promotion.map((i) => {
            if (i.food === name) {
                i.check_cart = "false"
                i.total = i.price
            } 
        })
         
    }
    const totalcal = () => {
        let t = 0
        cart.map((i) => {
            t = t + i.total
        })
        setTotal(t)
    }
    useEffect(() => {
        getMenu();
        getPromotion()
    }, [])
    
    const notify = () => toast.error('Menu added', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });;

    const scrollToCart = () => {
        window.scrollTo({
            top : 10000,
            behavior : 'smooth',
            
        }
        )
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
                if (i.check_cart === "true") {
                    i.check_cart = "false"
                    i.total = i.price
                } 
            })
            promotion.map((i) => {
                if (i.check_cart === "true") {
                    i.check_cart = "false"
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
            text : "total :" + t,
            buttons: true,
            dangerMode: true,
        }).then((conf) => {
            if (conf) {
                swal("Ordered!", {
                    icon : "success"
                })
                menus.map((i) => {
                if (i.check_cart === "true") {
                    i.check_cart = "false"
                    i.total = i.price
                }
                setCart(cart.filter(item => item.food === "name"));
            })
            }
        })
    }
}


    return <Fragment>
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
                            <td className="menu-name align-middle text-center w-50"><p>{menu.food}</p>{menu.price} B.</td>
                            <td className="align-middle w-30">{ menu.check_cart === "false"  && <button onClick={() => addtocart(menu)} className="btn-add" >Add</button> }
                                { menu.check_cart === "true"  && <button className="btn-added" onClick={notify}>Added</button> }
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
                        {promotion.map( menu => (                     
                            <tr> 
                                <td className="w-0"><img src={ P2 } className="menu-pic"/></td> 
                                <td className="menu-name align-middle text-center w-50"><p>{menu.food}</p><p>{menu.description}</p><p>{menu.price} B.</p></td>
                                
                                <td className="align-middle w-30">{ menu.check_cart === "false"  && <button onClick={() => addtocartPro(menu)} className="btn-add" >Add</button> }
                                    { menu.check_cart === "true"  && <button className="btn-added" onClick={notify}>Added</button> }
                                </td>
                            </tr>
                        ))}               
                    </tbody>
                </table>
            </div>
            </div>
        <div className="cart-container">                    
            <button type="button" onClick={scrollToCart} className="cart-btn">
                    {<GiShoppingCart className="cart-logo"/>} ×{cart.length}
            </button>
        </div>
        <div className="text-center">
            <h1 className="y">YOUR ORDER {<GiShoppingCart/>} /></h1>
            <h1>Table 1</h1>
        </div>
        
        <table class="table mt-5 text-center table-active">
            <thead>
                <tr>
                <th scope="col">Menu</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">remove</th>
                </tr>
            </thead>
            <tbody>
                {cart.map( i => (
                    <tr>
                    <td>{i.food}</td>
                    <td>{i.price}</td>
                    <td><button className="btn btn-light" onClick={() => decrease(i)}>-</button>     {i.quantity}     <button className="btn btn-light" onClick={() => increase(i)}>+</button></td>
                    <td>{i.total}</td>
                    <td><button className="btn btn-danger" name={i.food} onClick={removecart}>remove</button></td>
                    </tr>
                ))}               
            </tbody>
        </table>
        <div className="order text-center">
            <button className="btn-order btn-danger" onClick={() => reset()}>Clear order</button>
            <button className="btn-order btn-success"onClick={() => confirmAlert()} >Order</button>
        </div>
        <ToastContainer />                
    </Fragment>
};

export default Menu;