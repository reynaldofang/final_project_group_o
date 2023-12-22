const { ObjectId } = require("mongodb")
const authAdmin = require("../middleware/auth-admin")

const createFood = async (req, res)=>{
    try{
        const authHeader = req.headers.authorization
        
        if(!authHeader){
            return res.status(401).json({error: "Unauthorized"})
        } else{
            const token = authHeader.split(' ')[1]
            const authorUsername = authAdmin(token)

            if(!authorUsername){
                return res.status(401).json({error: "Unauthorized"})
            }
            
            const {name, description, price} = req.body
            if(!name || !description || !price){
                return res.status(400).json({
                    error: "Missing required fields"
                })
            }

            const image = req.file

            const newFood = await req.db.collection("food").insertOne({
                name,
                description,
                price,
                status: "ready",
                imageUrl: image?image.path:null,
            })

            res.status(200).json({
                message: "Success to create a new food"
            })
        }
    } catch(error){
        res.status(500).json({error: error.message})
    }
}


const updateFoodStatus = async (req, res)=>{
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: "Unauthorized" })
        } else {
            const token = authHeader.split(' ')[1]
            const authorUsername = authAdmin(token)

            if (!authorUsername) {
                return res.status(401).json({ error: "Unauthorized" })
            }

            const {status} = req.body
            const foodId = req.params.id

            const food = await req.db.collection("food").findOne({ _id: new ObjectId(foodId) })

            if (!food) {
                return res.status(404).json({ error: "Food not found" })
            } else {
                const updateFields = {}

                if (status) updateFields.status = status

                const result = await req.db.collection("food").updateOne(
                    { _id: new ObjectId(foodId) },
                    {
                        $set: updateFields,
                    }
                );

                if (result.modifiedCount === 1) {
                    return res.status(200).json({
                        message: "Success to update food status"
                    })
                } else {
                    return res.status(500).json({ error: "Failed to update food status" })
                }
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const deleteFoodById = async (req, res)=>{
    try{
        const authHeader = req.headers.authorization
        
        if(!authHeader){
            return res.status(401).json({error: "Unauthorized"})
        } else{
            const token = authHeader.split(' ')[1]
            const authorUsername = authAdmin(token)

            if(!authorUsername){
                return res.status(401).json({error: "Unauthorized"})
            }

            const foodId = req.params.id
            const food = await req.db.collection("food").findOne({_id: new ObjectId(foodId)})

            if(!food){
                return res.status(404).json({error: "Food not found"})
            } else{
                    const result = await req.db.collection("food").deleteOne({_id: new ObjectId(foodId)})
    
                    if(result.deletedCount === 1){
                        return res.status(200).json({
                            message: "Success delete an food"
                        })
                    } else{
                        return res.status(500).json({error: "Failed to delete food"})
                    }
                }
        }
    } catch(error){
        res.status(500).json({error: error.message})
    }
}


const orderFoods = async (req, res)=>{
    try{
        const authHeader = req.headers.authorization
        
        if(!authHeader){
            return res.status(401).json({error: "Unauthorized"})
        } else{
            const token = authHeader.split(' ')[1]
            const authorUsername = authAdmin(token)

            if(!authorUsername){
                return res.status(401).json({error: "Unauthorized"})
            }

            const orders = await req.db.collection("order").find().toArray()

            res.status(200).json({
                message: "Success get all food orders",
                data: orders
            })
        }
    } catch(error){
        res.status(500).json({error: error.message})
    }
}


const updateOrderStatus = async (req, res)=>{
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: "Unauthorized" })
        } else {
            const token = authHeader.split(' ')[1]
            const authorUsername = authAdmin(token)

            if (!authorUsername) {
                return res.status(401).json({ error: "Unauthorized" })
            }

            const {status} = req.body
            const orderId = req.params.id

            const order = await req.db.collection("order").findOne({ _id: new ObjectId(orderId) })

            if (!order) {
                return res.status(404).json({ error: "Order not found" })
            } else {
                const updateFields = {}

                if (status) updateFields.status = status

                const result = await req.db.collection("order").updateOne(
                    { _id: new ObjectId(orderId) },
                    {
                        $set: updateFields,
                    }
                );

                if (result.modifiedCount === 1) {
                    return res.status(200).json({
                        message: "Success to update order food status"
                    })
                } else {
                    return res.status(500).json({ error: "Failed to update order food status" })
                }
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


module.exports = {
    createFood,
    updateFoodStatus,
    deleteFoodById,
    orderFoods,
    updateOrderStatus
}