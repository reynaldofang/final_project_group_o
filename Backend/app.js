const express = require ("express")
const bodyParser = require("body-parser")
const database = require("./db")
const newsRoutes = require("./beritaMakanan/route")
const regisRoutes = require("./register/route")
const loginRoute = require("./login/route")

const app = express()
app.use(bodyParser.json())
app.use(database)

app.use("/news", newsRoutes)
app.use("/register", regisRoutes)
app.use("/login", loginRoute)

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
})