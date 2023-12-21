const { ObjectId } = require("mongodb")
const authAdmin = require("../middleware/auth-admin")

const createNutrition = async (req, res)=>{
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
            
            const {umur, energi, protein, lemak, karbohidrat, serat, air} = req.body
            if(!umur || !energi || !protein || !lemak || !karbohidrat || !serat || !air){
                return res.status(400).json({
                    error: "Missing required fields"
                })
            }

            const newNutrition = await req.db.collection("nutrition").insertOne({
                umur,
                energi,
                protein,
                lemak,
                karbohidrat,
                serat,
                air
            })

            res.status(200).json({
                message: "Success to create a new nutrition"
            })
        }
    } catch(error){
        res.status(500).json({error: error.message})
    }
}


const updateNutrition = async (req, res) => {
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

            const { umur, energi, protein, lemak, karbohidrat, serat, air } = req.body
            const nutritionId = req.params.id

            const nutrition = await req.db.collection("nutrition").findOne({ _id: new ObjectId(nutritionId) })

            if (!nutrition) {
                return res.status(404).json({ error: "Nutrition not found" })
            } else {
                const updateFields = {}

                if (umur) updateFields.umur = umur
                if (energi) updateFields.energi = energi
                if (protein) updateFields.protein = protein
                if (lemak) updateFields.lemak = lemak
                if (karbohidrat) updateFields.karbohidrat = karbohidrat
                if (serat) updateFields.serat = serat
                if (air) updateFields.air = air

                const result = await req.db.collection("nutrition").updateOne(
                    { _id: new ObjectId(nutritionId) },
                    {
                        $set: updateFields,
                    }
                );

                if (result.modifiedCount === 1) {
                    return res.status(200).json({
                        message: "Success to update a nutrition",
                    });
                } else {
                    return res.status(500).json({ error: "Failed to update nutrition" })
                }
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const deleteNutritionById = async (req, res)=>{
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

            const nutritionId = req.params.id
            const nutrition = await req.db.collection("nutrition").findOne({_id: new ObjectId(nutritionId)})

            if(!nutrition){
                return res.status(404).json({error: "Nutrition not found"})
            } else{
                const result = await req.db.collection("nutrition").deleteOne({_id: new ObjectId(nutritionId)})

                if(result.deletedCount === 1){
                    return res.status(200).json({
                        message: "Success delete a nutrition list"
                    })
                } else{
                    return res.status(500).json({error: "Failed to delete nutrition"})
                }
            }
        }
    } catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    createNutrition,
    updateNutrition,
    deleteNutritionById
}