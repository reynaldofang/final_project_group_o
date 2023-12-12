const {Router} = require("express")
const {allNews} = require("./controller")

const newsRoutes = Router()

newsRoutes.get("", allNews)

module.exports = newsRoutes