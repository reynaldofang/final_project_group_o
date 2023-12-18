const {Router} = require("express")
const {allNews, latestNews, newsById} = require("./controller")
const {createNews, deleteNewsById} = require("./admin-controller")

const newsRoutes = Router()

newsRoutes.get("", allNews)
newsRoutes.get("/latest", latestNews)
newsRoutes.get("/:id", newsById)
newsRoutes.post("", createNews)
newsRoutes.delete("/:id", deleteNewsById)

module.exports = newsRoutes