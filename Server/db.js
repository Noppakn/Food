const Pool = require("pg").Pool;
const pool = new Pool({
    user : "postgres",
    password : "082544",
    database : "food_order",
    host : "localhost",
    port : 5432
})

module.exports = pool;