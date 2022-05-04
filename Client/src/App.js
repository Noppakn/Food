import React from "react" ; 
import Menu1 from "./Page/menu-table1"
import Menu2 from "./Page/menu-table2";
import Menu3 from "./Page/menu-table3";
import Login from "./Page/login"
import Order from "./Page/order"
import KitchenOrderAlert from "./Page/kitchen-order-alert";
import KitchenAcceptOrder from "./Page/kitchen-accept-order";
import CustomerOrder from "./Page/customer-order";
import HomePage from "./Page/homepage";
import TableInfo from "./Page/table-info";
import AdminHome from "./Page/admin-home";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  return ( 
  <Router>
    <Routes>
      <Route exact path="/menu1" element={<Menu1/>} />
      <Route exact path="/menu2" element={<Menu2/>} />
      <Route exact path="/menu3" element={<Menu3/>} />
      <Route exact path="/" element= {<Login/>} />
      <Route exact path="/order" element= {<Order/>} />
      <Route exact path="/kitchen-order-alert" element= {< KitchenOrderAlert/>} />
      <Route exact path="/kitchen-accept-order" element= {< KitchenAcceptOrder/>} />
      <Route exact path="/customer-order" element={< CustomerOrder />} />
      <Route exact path="/home" element= {<HomePage />}/>
      <Route export path="/Table-info" element = {<TableInfo/>} />
      <Route export path="/admin-home" element = {<AdminHome/>} />
    </Routes>
  </Router>
  )
}

export default App;
