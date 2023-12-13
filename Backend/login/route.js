const {Router} = require("express")
const {login} = require("./controller")

const loginRoute = Router()

loginRoute.post("", login)

module.exports = loginRoute