const { ObjectId } = require("mongodb")

const allFoods = async (req, res)=>{
    try{
        const foods = await req.db.collection("food").find().toArray()

        res.status(200).json({
            message: "Success get all foods",
            data: foods
        })
    } catch(error){
        res.status(500).json({error: error.message})
    }
}


const foodById = async (req, res)=>{
    try{
        const foodId = req.params.id
        
        if(!ObjectId.isValid(foodId)){
            return res.status(400).json({error: "Invalid food Id"})
        }

        const food = await req.db.collection("food").findOne({_id: new ObjectId(foodId)})

        if(!food){
            return res.status(404).json({error: "Food not found"})
        }

        res.status(200).json({
            data: food
        })
    } catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    allFoods,
    foodById
}