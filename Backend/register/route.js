const {Router} = require("express")
const {register} = require("./controller")

const regisRoutes = Router()

regisRoutes.post("", register)

module.exports = {
    regisRoutes
}