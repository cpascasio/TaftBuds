const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

const requireAuth = async (req, res, next) => {

    const { authorization } = req.headers;

    if (!authorization) {
        console.log("AUTHORIZERATION: ", authorization);
        return res.status(401).json({ error: "You must be logged in." });
    }

    const token = authorization.split(" ")[1];


    try{
        const {_id} = jwt.verify(token, process.env.JWT_SECRET);

        console.log("ID: ", _id);


        req.user = await User.findOne({_id}).select("_id");
        next();



    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Request is not authorized" }); 

    }



}

module.exports = requireAuth;