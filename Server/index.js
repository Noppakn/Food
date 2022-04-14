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
app.get("/promotion", async(req, res) => {
    try {
        const menu = await pool.query("SELECT * FROM promotion")
        res.json(menu.rows)
    } catch (error) {
        console.error(error.message)
    }
})
app.listen(port, () => {
    console.log("Start at port ", port)
})



