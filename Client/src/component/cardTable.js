import React from "react";
import '../css/card.css'
import axios from 'axios'
import swal from 'sweetalert'
import { Link } from "react-router-dom";
import { FaUserAlt } from 'react-icons/fa'

export default class Card extends React.Component {
    constructor(props) {
        super(props);

        
      }
    
    render() {
        
        return (
          
            <div className="card">
              <div className="card__body">
                <h2 className="card__title">T{this.props.table}</h2>
                {this.props.status === 0  && <p>ไม่มีลูกค้านั่ง < FaUserAlt /></p>}
                {this.props.status === 1 && <p className="text-success">มีลูกค้านั่ง < FaUserAlt /></p>}
                {this.props.status === 2 && <Link to = "/Table-info" state={{table : this.props.table,user:this.props.user}}><p className="text-waring"> เรียกพนักงาน </p><button className="btn btn-success">จัดการโต๊ะ</button></Link>}
                {this.props.status === 3 && <Link to = "/Table-info" state={{table : this.props.table,user:this.props.user}}><p className="text-waring"> เรียกจ่ายเงิน </p><button className="btn btn-success">จัดการโต๊ะ</button></Link>}
                {this.props.status === 0  && <button className="btn btn-secondary">จัดการโต๊ะ</button>}
                {this.props.status === 1 && <Link to = "/Table-info" state={{table : this.props.table,user:this.props.user}}><button className="btn btn-success">จัดการโต๊ะ</button></Link>}
                
                
              </div>
            </div>
          
          );
    }
  }