const {Router} = require("express")
const {allNews, newsById} = require("./controller")

const newsRoutes = Router()

newsRoutes.get("", allNews)
newsRoutes.get("/:id", newsById)

module.exports = newsRoutes