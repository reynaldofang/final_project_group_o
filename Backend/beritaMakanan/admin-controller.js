const { ObjectId } = require("mongodb")
const authAdmin = require("../middleware/auth-admin")

const createNews = async (req, res)=>{
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
            
            const {title, content} = req.body
            if(!title || !content){
                return res.status(400).json({
                    error: "Missing required fields"
                })
            }

            const image = req.file

            const currentDate = new Date()
            const dateFormat = currentDate.toLocaleString("id-ID", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            })

            const newNews = await req.db.collection("news").insertOne({
                title,
                content,
                creationDate: dateFormat,
                authorUsername,
                imageUrl: image?image.path:null,
            })

            res.status(200).json({
                message: "Success to create a new news"
            })
        }
    } catch(error){
        res.status(500).json({error: error.message})
    }
}


const deleteNewsById = async (req, res)=>{
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

            const newsId = req.params.id
            const news = await req.db.collection("news").findOne({_id: new ObjectId(newsId)})

            if(!news){
                return res.status(404).json({error: "News not found"})
            } else{
                if(authorUsername != news.authorUsername){
                    return res.status(401).json({error: "Author mismatch"})
                } else{
                    const result = await req.db.collection("news").deleteOne({_id: new ObjectId(newsId)})
    
                    if(result.deletedCount === 1){
                        return res.status(200).json({
                            message: "Success delete a news"
                        })
                    } else{
                        return res.status(500).json({error: "Failed to delete news"})
                    }
                }
            }
        }
    } catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    createNews,
    deleteNewsById
}