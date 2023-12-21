const allNutrition = async (req, res)=>{
    try{
        const nutrition = await req.db.collection("nutrition").find().toArray()

        res.status(200).json({
            message: "Success get all nutrition",
            data: nutrition
        })
    } catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = allNutrition