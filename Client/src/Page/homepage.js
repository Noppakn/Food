import React,{ useEffect, useState} from "react";
import axios from 'axios'
import EventCardTable from '../event/eventcardTable'
import Navbar from "../component/navbar";

const HomePage = () => {
    const [tables,setTable] = useState([])
    const getTable = async() => {
        try {
            
            const response = await fetch("http://localhost:3001/table-info")
            const jsonData = await response.json()

            setTable(jsonData)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getTable();
    }, [])
    
    return (
        <div>
        < Navbar />
        <div className="login-container">
            <div className="login-header">
                <h1> การแจ้งเตือน </h1>
            </div>
            <div className="orderr-content">
                
                <h1>โต๊ะลูกค้า</h1>
                < EventCardTable data={tables} />
                
            </div>
        </div>
        </div>
    )
}

export default HomePage;