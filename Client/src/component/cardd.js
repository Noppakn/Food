import React from "react";
import '../css/card.css'
import axios from 'axios'
import swal from 'sweetalert'
import { Link } from "react-router-dom";
import { FaUserAlt } from 'react-icons/fa'

const close = () => {
    this.prop.sta = 1
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
                
                {this.props.sta === 0 && <p className="text-success" onClick={() => close()}>ปกติ</p>}
                {this.props.sta === 1 && <p className="text-warning">ปิด</p>}
                
                
                
              </div>
            </div>
          
          );
    }
  }