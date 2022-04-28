import React,{ useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import axios from 'axios'


const TableInfo = () => {
    const [total,setTotal] = useState({total :0})
    const location = useLocation()
    const data = location.state
    const [orders,setOrder] = useState([])
    const getOrder = async() => {
        try {
            
            const response = await fetch("http://localhost:3001/admin-order")
            const jsonData = await response.json()
            setOrder(jsonData)             
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => {
        getOrder()
    }, [])
    console.log(orders)
    const g = []
    const totalcal = (data) => {
        g.push(data)
    }
    const pricecal = (data) => {
        let price = 0
        data.map(i => {
            if (i[2] === "accept") {
                let sub = i[3] * i[1]
                price += sub
            }
            
        })
        
        
        totalcal(price)
        return <p>{price}</p>
    }
    const summ = []
    const sumtotal = () => { 
        let sum = 0;
        let vat = 0;
        let sumvat = 0;
        

        for (let num of g){

            sum = sum + num
        }
        vat = sum * 0.07
        sumvat = sum + vat
        summ.push(sumvat)
        return (<div className="sumdiv"><div className="sumdivdiv"><p> ราคาไม่รวมภาษีมูลค่าเพิ่ม 7 %  : {sum}</p>
                    <p> ภาษีมูลค่าเพิ่ม 7% : {vat}</p>
                    <p1>  ราคารวม : {sumvat} บาท</p1>
                </div>
                </div>
        )
        
    }
    const confirmpay = () => {
        const bodyTable = {
            'status' : 0,
            'table' : data.table
        }
        axios.put("http://localhost:3001/update-table-info",bodyTable, {
            headers: {
                'content-type': 'application/json',
            }
        })
        
        window.location.href = '/home'
    }
    console.log(data.table)
    return(
        <div className="login-container">
            <div className="login-header">
                <h1> T{data.table} </h1>
            </div>
            <div className="orderr-content">
                
                <h1>ชำระเงิน</h1>
                <table className="tablee table-hover">
                        <thead>
                            <tr>
                            <th className="text-center" scope="col">ผู้สั่ง</th>
                            <th  scope="col">รายการอาหาร</th>
                            <th  scope="col">ราคา</th>                                           
                            <th className="text-center" scope="col">สถานะ</th>
                            </tr>
                        </thead>
                        <tbody>  
                        {orders.map(i => {
                                if (i.table === data.table) {
                                    return (<tr>
                                        <td className="text-center">T{i.table}</td>
                                        <td><ul>
                                            {i.menu.map(j => {
                                                return (<li>{j[0]} x {j[1]}  {j[2] === "accept" && <p className="text-success">{j[2]}</p>}
                                                                             { j[2] === "cancel" && <p className="text-danger">{j[2]}</p>}</li>)
                                        })} </ul></td>
                                        <td>{pricecal(i.menu)}</td>
                                        <td className="text-center">{i.order_status === 0 && <button className="btn btn-warning" >รอดำเนินการ</button>}
                                            {i.order_status === 1 && <button className="btn btn-danger">ถูกยกเลิก</button>}
                                            {i.order_status === 2 && <button className="btn btn-warning">กำลังจัดเตรียมอาหาร</button>}
                                            {i.order_status === 3 && <button className="btn btn-success">ให้บริการแล้ว</button>}</td>
                                    </tr>)
                                }
                            })}   
                        </tbody>
                    </table>
                    <div className="bottom-pay">{sumtotal()}
                            <div className="payment"  >
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input type="radio" class="form-check-input" name="optradio" value="เงินสด" defaultChecked/> เงินสด
                                    </label>
                                </div>
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input type="radio" class="form-check-input" name="optradio" value="โอน"/> โอน
                                    </label>
                                </div>
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input type="radio" class="form-check-input" name="optradio" value="บัตรเครดิต"/> บัตรเครดิต
                                    </label>
                                </div>
                                <button className="btn btn-success" onClick={() => confirmpay()}>ยืนยันการชำระเงิน</button>
                            </div>
                            
                    </div>
                
                
            </div>
        </div>
    )
}

export default TableInfo;