const jwt = require("jsonwebtoken")

const generateToken = (username, role) => {
    const payload = {
        username,
        role,
    }
    const options = {
        expiresIn: "1h",
    }
    return jwt.sign(payload, "your-secret", options)
}

module.exports = generateToken