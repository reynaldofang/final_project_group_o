const allNews = async (req, res)=>{
    try{
        const news = await req.db.collection("news").find({}, {projection: {_id:0}}).toArray()

        res.status(200).json({
            message: "Success get all news",
            news: news
        })
    } catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    allNews,
}