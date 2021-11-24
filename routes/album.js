var express = require("express");
var router=express.Router();
router.get("/",function (req,res){

    res.render("album/table", );

})

router.get("/get",function (req,res){
    const request = require('request');
    request('https://jsonplaceholder.typicode.com/albums', { json: true }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log( body );
            var obj={
                "draw": 10,
                "recordsTotal": body.rows,
                "recordsFiltered": body.rows,
                "data": body
            }

            res.status(200).json(obj);
        }
    })
})
module.exports=router;
