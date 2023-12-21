const {Router} = require("express")
const allNutrition = require("./controller")
const {createNutrition, updateNutrition, deleteNutritionById} = require("./admin-controller")

const nutritionRoutes = Router()

nutritionRoutes.get("", allNutrition)
nutritionRoutes.post("", createNutrition)
nutritionRoutes.patch("/:id", updateNutrition)
nutritionRoutes.delete("/:id", deleteNutritionById)

module.exports = nutritionRoutes