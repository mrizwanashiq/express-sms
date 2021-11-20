var express = require("express");
var router=express.Router();
var schoolBal=require("../BAL/school");

router.get("/",function (req,res){

        res.render("school/table", );

})

router.post("/",function (req,res){
    schoolBal.add(req.body,function (data, err){
        schoolBal.getAll(function (data, err) {
            res.render("school/table", {data: data.data});
        })
    })
})

router.post("/update",function (req,res){
    schoolBal.update(req.body,function (data,err){
        if (data.message=="success") {
            res.redirect("/school/table/")
        }
        else { console.log('Error in school update :' + data); }
    })
})
router.get('/rizwan/:id?', (req, res) => {
    schoolBal.getById(req.params.id, (data, doc) => {
        if (data.message == "success") {
            res.render("addOrUpdate", {data: data.data});
        }
    });

});
router.get('/delete/:id?', (req, res) => {
    schoolBal.removeById(req.params.id, (data, doc) => {
        if (data.message=="success") {
            res.redirect("/school/")
        }
        else { console.log('Error in school delete :' + data); }
    });
});


router.get('/ajax/:id?', (req, res) => {
    schoolBal.getById(req.params.id, (data, doc) => {
        if (data.message == "success") {
            res.status(200).json(data.data)

        }
    });

});

router.post("/serverside",function (req,res){
    schoolBal.getForTable(req.body,function (data) {
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
