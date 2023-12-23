const { ObjectId } = require("mongodb")
const authUser = require("../middleware/auth-user")

const orderFood = async (req, res)=>{
    try{
        const authHeader = req.headers.authorization
        
        if(!authHeader){
            return res.status(401).json({error: "Unauthorized"})
        } else{
            const token = authHeader.split(' ')[1]
            const userUsername = authUser(token)

            if(!userUsername){
                return res.status(401).json({error: "Unauthorized"})
            }

            const orders = req.body.orders;

            if (!orders || !Array.isArray(orders) || orders.length === 0) {
                return res.status(400).json({ error: "Invalid input" });
            }

            const orderResults = [];

            for (const order of orders) {
                const { foodId, quantity } = order;

                if (!foodId || !quantity || quantity <= 0) {
                    return res.status(400).json({ error: "Invalid input in one of the orders" });
                }

                const food = await db.collection('food').findOne({ _id: new ObjectId(foodId) });
                if (!food) {
                    return res.status(404).json({ error: "Food not found in one of the orders" });
                }

                const totalPrice = food.price * quantity;

                const singleOrder = {
                    food: {
                        _id: food._id,
                        name: food.name,
                        price: food.price,
                    },
                    quantity,
                    totalPrice,
                    status: "pending",
                    user: userUsername,
                };

                const result = await db.collection('order').insertOne(singleOrder);
            }

            res.status(201).json({
                message: "Orders placed successfully",
            });
        }
    } catch(error){
        res.status(500).json({error: error.message})
    }
}


const allUserOrder = async (req, res) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({ error: "Unauthorized" })
        } else {
            const token = authHeader.split(' ')[1]
            const userUsername = authUser(token)

            if (!userUsername) {
                return res.status(401).json({ error: "Unauthorized" })
            }

            const orders = await req.db.collection("order").find({ user: userUsername }, {projection: {user:0}}).toArray()

            if (orders.length === 0) {
                return res.status(404).json({ error: "Orders not found for the user" })
            } else {
                return res.status(200).json({
                    message: "Success get food orders",
                    data: orders
                });
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const userOrderById = async (req, res)=>{
    try{
        const authHeader = req.headers.authorization
        
        if(!authHeader){
            return res.status(401).json({error: "Unauthorized"})
        } else{
            const token = authHeader.split(' ')[1]
            const userUsername = authUser(token)

            if(!userUsername){
                return res.status(401).json({error: "Unauthorized"})
            }

            const orderId = req.params.id
            const order = await req.db.collection("order").findOne({_id: new ObjectId(orderId)})

            if(!order){
                return res.status(404).json({error: "Order not found"})
            } else{
                if(userUsername !== order.user){
                    return res.status(401).json({error: "User mismatch"})
                } else{        
                    return res.status(200).json({
                        message: "Success get a food order",
                        data: order
                    })
                }
            }
        }
    } catch(error){
        res.status(500).json({error: error.message})
    }
}


module.exports = {
    orderFood,
    allUserOrder,
    userOrderById
}