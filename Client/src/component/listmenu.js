import React,{Fragment, useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert'



const Menu = () => {
    const table = 1
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
        <div className="cart fixed-top">
            <button type="button" onClick={scrollToCart} className="cart-btn">
                <FontAwesomeIcon icon={faNewspaper} /> {cart.length}
            </button>
        </div>
        <table class="table mt-5 table-active ">
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
                    <td className="menu-name align-middle text-center w-50"><p>{menu.food}</p>{menu.price} ฿</td>
                    <td className="align-middle w-30">{ menu.check_cart === "false"  && <button onClick={() => addtocart(menu)} className="btn-add" >Add</button> }
                        { menu.check_cart === "true"  && <button className="btn-added" onClick={notify}>Added</button> }
                    </td>
                    </tr>
                ))}               
            </tbody>
        </table>
        
        <div className="text-center">
            <h1 className="y">YOUR ORDER <FontAwesomeIcon icon={faNewspaper} /></h1>
            <h1>Table 1</h1>
        </div>
        
        <table class="table mt-5 text-center table-dark">
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