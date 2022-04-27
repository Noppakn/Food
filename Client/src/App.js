import React from "react" ; 
import Menu from "./Page/listmenu"
import Login from "./Page/login"
import Order from "./Page/order"
import KitchenOrderAlert from "./Page/kitchen-order-alert";
import KitchenAcceptOrder from "./Page/kitchen-accept-order";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  return ( 
  <Router>
    <Routes>
      <Route exact path="/menu" element={<Menu/>} />
      <Route exact path="/login" element= {<Login/>} />
      <Route exact path="/order" element= {<Order/>} />
      <Route exact path="/kitchen-order-alert" element= {< KitchenOrderAlert/>} />
      <Route exact path="/kitchen-accept-order" element= {< KitchenAcceptOrder/>} />
    </Routes>
  </Router>
  )
}

export default App;
