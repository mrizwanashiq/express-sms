var express = require("express");
var jwt = require("jsonwebtoken");
const {verify} = require("jsonwebtoken");
var router=express.Router();
router.get("/",function (req,res){

    res.render("album/table", );

})

router.get("/api", verifyToken,function (req,res){
    jwt.verify(req.token, 'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
            res.json({message:'Post Created',authData})
        }
    })

    const user = {
        user: 1,
        username: "mrizwanashiq",
        email:"mrizwanashiq@outlook.com"
    }

    jwt.sign({user:user}, "secretkey",(err, token)=>{
        res.json({token})
    })


})

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]

        req.token = bearerToken;

        next();
    } else{
        res.sendStatus(403)
    }
}

router.post("/login",function (req,res){
    const user = {
        user: 1,
        username: "mrizwanashiq",
        email:"mrizwanashiq@outlook.com"
    }

    if(req.body.username == "mrizwanashiq" && req.body.password == "password"){
        jwt.sign({user:user}, "secretkey",(err, token)=>{
            res.json({token})
        })
    } else{
        res.sendStatus(403)
    }




})

module.exports=router;
