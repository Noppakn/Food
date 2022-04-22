import React from "react" ; 
import Menu from "./Page/listmenu"
import Login from "./Page/login"



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  return ( 
  <Router>
    <Routes>
      <Route exact path="/menu" element={<Menu/>} />
      <Route exact path="/login" element= {<Login/>} />
    </Routes>
  </Router>
  )
}

export default App;
