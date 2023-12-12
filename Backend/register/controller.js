const bcrypt = require("bcrypt")

const register = async (req, res)=>{
    const {email, username, password, role} = req.body
    
    try{
        const user = await req.db.collection("users").findOne({username})
      
        if(user){
            throw new Error("Username already exists")
        } 
      
        const hashedPassword = await bcrypt.hash(password, 10)
      
        const newUser = await req.db.collection("users").insertOne({email, username, password: hashedPassword, role})

        res.status(200).json({
            message: "User successfully registered",
        })
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    register
}