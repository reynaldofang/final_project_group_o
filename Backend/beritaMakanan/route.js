const {Router} = require("express")
const {allNews, latestNews, newsById} = require("./controller")
const {createNews, deleteNewsById} = require("./admin-controller")
const commentNews = require("./user-controller")

const newsRoutes = Router()

newsRoutes.get("", allNews)
newsRoutes.get("/latest", latestNews)
newsRoutes.post("", createNews)
newsRoutes.post("/comment/:id", commentNews)
newsRoutes.get("/:id", newsById)
newsRoutes.delete("/:id", deleteNewsById)

module.exports = newsRoutes