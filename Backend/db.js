const {MongoClient} = require("mongodb")

const database = async (req, res, next)=>{
    const mongoClient = await new MongoClient('mongodb://127.0.0.1:27017')
    db = mongoClient.db('finalProject')

    req.db = db

    next()
}

module.exports = database