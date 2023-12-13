const bcrypt = require("bcrypt")
const generateToken = require("../utils/jwt-utils")

const login = async (req, res)=>{
    const {username, password} = req.body
    const users = await req.db.collection("users").findOne({username})
    
    const isPasswordCorrect = await bcrypt.compare(password, users.password) 
    
    if(isPasswordCorrect){
        const token = generateToken(users.username, users.role)
        
        res.status(200).json({
            message: "User successfully logged in",
            accessToken: token
        })
    } else{
        res.status(400).json({error: "Username or password is incorrect"})
    }
}

module.exports = {
    login
}