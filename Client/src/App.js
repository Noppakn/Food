import React, {Fragment} from "react" ; 
import Menu from "./Page/listmenu"
import './css/listmenu.css'
import './App.css'
function App() {
  return ( 
  <Fragment>
    <div className="header">
      <h1>Pizza Monkey </h1>
    </div>
    
    <Menu />
  </Fragment>
  )
}

export default App;
