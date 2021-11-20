var express = require("express");
var router=express.Router();
var classBal=require("../BAL/class");

router.get("/",function (req,res){

        res.render("class/table", );

})

router.get("/getall",function (req,res){
    classBal.update(req.body,function (data,err){
        if (data.message=="success") {
            res.status(200).json(data.data)
        }
        else { console.log('Error in class update :' + data); }
    })

    if (data.message == "success") {
        res.status(200).json(data.data)
    }
})

router.post("/",function (req,res){
    classBal.add(req.body,function (data, err){
        classBal.getAll(function (data, err) {
            res.render("class/table", {data: data.data});
        })
    })
})

router.post("/update",function (req,res){
    classBal.update(req.body,function (data,err){
        if (data.message=="success") {
            res.redirect("/class/")
        }
        else { console.log('Error in class update :' + data); }
    })
})
router.get('/rizw/:id?', (req, res) => {
    classBal.getById(req.params.id, (data, doc) => {
        if (data.message == "success") {
            res.render("addOrUpdate", {data: data.data});
        }
    });

});

router.get('/delete/:id?', (req, res) => {
    classBal.removeById(req.params.id, (data) => {
        if (data.message=="success") {
            res.redirect("/class/")
        }
        else { console.log('Error in class delete :' + data); }
    });
});


router.get('/ajax/:id?', (req, res) => {
    classBal.getById(req.params.id, (data) => {
        if (data.message == "success") {
            res.status(200).json(data.data)
        }
    });

});

router.post("/serverside",function (req,res){
    var a = 10;
    classBal.getForTable(req.body,function (data) {
        var obj={
            "draw": req.body.draw,
            "recordsTotal": data.rows,
            "recordsFiltered": data.rows,
            "data": data.data
            }
        res.status(200).json(obj);
    })
})
module.exports=router;
