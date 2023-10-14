const JWT = require("jsonwebtoken");
let SECRATE_KEY = "sonu1234";

const authenticateUser = async (req, res, next) => {
    let token = req.cookies?.token;

    try {
        if (!token) {
            return res.status(200).json({ status: "fail", message: "Token is not found!" })
        }

        let verifiedToken = JWT.verify(token, SECRATE_KEY);
        if (!verifiedToken) {
            return res.status(200).json({ status: "fail", message: "Wrong token found!" });
        }

        req.verifiedToken = verifiedToken;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({status: 'fail', message:error.message});
    }
}

module.exports = authenticateUser;