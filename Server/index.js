const express = require("express");
const app = express();
const pool = require("./db")
const port = process.env.PORT || 3001;
const cors = require("cors")

app.use(express.json())
app.use(
    cors({
        origin: "*"
    })
)

//ROUTES//

//get all
app.get("/menu", async(req, res) => {
    try {
        const menu = await pool.query("SELECT * FROM menu")
        res.json(menu.rows)
    } catch (error) {
        console.error(error.message)
    }
})
app.get("/promotion", async(req, res) => {
    try {
        const menu = await pool.query("SELECT * FROM promotion")
        res.json(menu.rows)
    } catch (error) {
        console.error(error.message)
    }
})
app.get("/admin-order", async(req,res) => {
    try {
        const me = await pool.query("SELECT * FROM custorder")
        res.json(me.rows)
    } catch(error) {
        console.error(error.message)
    }
})

app.listen(port, () => {
    console.log("Start at port ", port)
})
// update
app.put("/menu/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const { out } = req.body;

        const update = await pool.query(
            "UPDATE menu set out_of_stock =$1 WHERE food_id = $2",[out,id]
        )
        res.json("Update!")
    } catch (error) {
        console.error(error.message)
    }
})
// status_order
app.put("/update-admin-order", async (req,res) => {
    try {
        const  body  = req.body;
        const update = await pool.query(
            `
            UPDATE public.custorder
            SET order_status= $1, menu = $2
            WHERE order_id = $3;
            `,[body.order_status,body.menu,body.order_id]
            
        )
        res.json("Update!")
    } catch (error) {
        console.error(error.message)
    }
})

//post
app.post("/create-order", async (req, res) => {
    try {
        const order = req.body
        const insert = await pool.query (
            `
            INSERT INTO public."custorder" ("table","total","menu") 
            VALUES ($1,$2,$3)
            `,[order.table, order.total, order.menu]
        )
        res.json("Create!")
    } catch (error) {
        console.error(error.message)
    }
})





