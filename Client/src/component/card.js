import React from "react";
import '../css/card.css'
import axios from 'axios'
import swal from 'sweetalert'
import { Link } from "react-router-dom";
const baseUrl = "http://localhost:3001/update-admin-order"

const Cancelorder = (id,order) => {
  swal({
    title: "Confirm cancel",
    buttons: true,
    dangerMode: true,
}).then((conf) => {
  if (conf) {
    const body = {
      'order_status' : 1,
      'menu' : order,
      'order_id' : id,
  }
  axios.put(baseUrl,body, {
      headers: {
          'content-type': 'application/json',
      }})
  window.location.reload(false);
  }
})


}
export default class Card extends React.Component {
    constructor(props) {
        super(props);
        
      }
    render() {
        return (
            <div className="card">
              <div className="card__body">
                <h2 className="card__title">T{this.props.table}</h2>
                <ul>
                {this.props.order.map(i => {
                    return <li>{i[0]} x{i[1]}</li>
                })}
                </ul>
                
              </div>
              <Link to ="/kitchen-accept-order" state={{ order_id: this.props.order_id , table:this.props.table, order: this.props.order,user:this.props.user}}>
                <button className="btn btn-success">รับ</button>
              </Link>
              <button className="btn btn-danger" onClick={() => {Cancelorder(this.props.order_id,this.props.order)}}>ยกเลิก</button>
            </div>
          );
    }
  }