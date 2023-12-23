const jwt = require("jsonwebtoken")

const authAdmin = (token)=>{
    try{
        const decodeToken = jwt.verify(token, "your-secret")
    
        if(decodeToken.role === 'admin'){
            return decodeToken.username
        } else{
            throw new Error("Unauthorized")
        }
    } catch (error){
        return null
    }
}

module.exports = authAdmin