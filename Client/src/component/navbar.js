import React from "react";
import "../css/navbar.css"
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <div className="nav-con">
            <Link to="/home"><button>หน้าหลัก</button></Link>
            <Link to="/kitchen-order-alert"><button>รับออเดอร์</button></Link>
            <Link to="/order"><button>สถานะออเดอร์</button></Link>
            <button onClick={() => window.location.href = '/'}>ออกจากระบบ</button>
        </div>
    )
}

export default Navbar;