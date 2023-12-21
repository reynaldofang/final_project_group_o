const {MongoClient} = require("mongodb")

const database = async (req, res, next)=>{
    const mongoClient = await new MongoClient('mongodb://finalProject_hurriedmy:1c5af4f0f1f95aa64cd81f13521d24643abab8a5@azl.h.filess.io:27017/finalProject_hurriedmy')
    db = mongoClient.db('finalProject_hurriedmy')

    req.db = db

    next()
}

module.exports = database