const { ObjectId } = require("mongodb")

const allNews = async (req, res)=>{
    try{
        const news = await req.db.collection("news").find().toArray()

        const truncatedNews = news.map((item)=>{
            return{
                _id: item._id,
                title: item.title,
                content: item.content.length>26?`${item.content.substring(0, 26)}...` : item.content,
            }
        })

        res.status(200).json({
            message: "Success get all news",
            news: truncatedNews
        })
    } catch(error){
        res.status(500).json({error: error.message})
    }
}


const latestNews = async (req, res)=>{
    try {
        const latestNews = await req.db
            .collection("news")
            .find()
            .sort({creationDate: -1})
            .limit(6)
            .toArray();

        const truncatedNews = latestNews.map((item)=>{
            return{
                _id: item._id,
                title: item.title,
                content: item.content.length>26?`${item.content.substring(0, 26)}...` : item.content,
            }
        })
    
        res.status(200).json({
            message: "Success to get the latest news",
            news: truncatedNews,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const newsById = async (req, res)=>{
    try{
        const newsId = req.params.id
        
        if(!ObjectId.isValid(newsId)){
            return res.status(400).json({error: "Invalid news Id"})
        }

        const news = await req.db.collection("news").findOne({_id: new ObjectId(newsId)})

        if(!news){
            return res.status(404).json({error: "News not found"})
        }

        const comment = await req.db.collection("comment").find(
            {newsId: new ObjectId(newsId)},
            {projection: {_id:0, newsId:0}}
        ).toArray()

        res.status(200).json({
            news: news,
            comment: comment
        })
    } catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    allNews,
    latestNews,
    newsById
}