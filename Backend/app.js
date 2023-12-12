const express = require ("express")
const bodyParser = require("body-parser")
const database = require("./db")
const newsRoutes = require("./beritaMakanan/route")

const app = express()
app.use(bodyParser.json())
app.use(database)

app.use("/news", newsRoutes)

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
})