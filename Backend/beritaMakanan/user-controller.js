const { ObjectId } = require("mongodb")
const authUser = require("../middleware/auth-user")

const commentNews = async (req, res)=>{
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

            const newsId = req.params.id
        
            if(!ObjectId.isValid(newsId)){
                return res.status(400).json({error: "Invalid news Id"})
            }

            const news = await req.db.collection("news").findOne({_id: new ObjectId(newsId)})

            if(!news){
                return res.status(404).json({error: "News not found"})
            }

            const {comment} = req.body

            if (!comment) {
                return res.status(400).json({ error: "Comment required" });
            } else {
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

                const newComment = {
                    user: userUsername,
                    comment: comment,
                    createdAt: dateFormat
                };

                const result = await req.db.collection("comment").insertOne({
                    newsId: new ObjectId(newsId),
                    ...newComment,
                });

                res.status(201).json({
                    message: "Comment added successfully"
                });
            }
        }
    } catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = commentNews