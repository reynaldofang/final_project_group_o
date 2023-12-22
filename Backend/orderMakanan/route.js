const {Router} = require("express")
const {allFoods, foodById} = require("./controller")
const {createFood, updateFoodStatus, deleteFoodById, orderFoods, updateOrderStatus} = require("./admin-controller")
const {orderFood, allUserOrder, userOrderById} = require("./user-controller")

const orderRoutes = Router()

orderRoutes.post("/input", createFood)
orderRoutes.patch("/input/:id", updateFoodStatus)
orderRoutes.delete("/input/:id", deleteFoodById)
orderRoutes.get("/order", orderFoods)
orderRoutes.patch("/order/:id", updateOrderStatus)

orderRoutes.post("/checkout", orderFood)
orderRoutes.get("/checkout", allUserOrder)
orderRoutes.get("/checkout/:id", userOrderById)

orderRoutes.get("", allFoods)
orderRoutes.get("/:id", foodById)

module.exports = orderRoutes