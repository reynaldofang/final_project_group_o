const jwt = require("jsonwebtoken")

const authUser = (token)=>{
    try{
        const decodeToken = jwt.verify(token, "your-secret")
    
        if(decodeToken.role === 'user'){
            return decodeToken.username
        } else{
            throw new Error("Unauthorized")
        }
    } catch (error){
        return null
    }
}

module.exports = authUser