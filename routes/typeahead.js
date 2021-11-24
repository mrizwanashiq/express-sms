var express = require("express");
var router=express.Router();
var teacherBal=require("../BAL/teacher");
var classBal=require("../BAL/class");

router.get("/",function (req,res){
    res.render("typeahead/table", );
})



router.post("/",function (req,res){
    teacherBal.add(req.body,function (data){
        teacherBal.getAll(function (data) {
            res.render("school/table", {data: data.data});
        })
    })
})

router.post("/update",function (req,res){
    teacherBal.update(req.body,function (data,err){
        if (data.message=="success") {
            res.redirect("/school/table/")
        }
        else { console.log('Error in school update :' + data); }
    })
})
router.get('/rizwan/:id?', (req, res) => {
    teacherBal.getById(req.params.id, (data, doc) => {
        if (data.message == "success") {
            res.render("addOrUpdate", {data: data.data});
        }
    });

});
router.get('/delete/:id?', (req, res) => {
    teacherBal.removeById(req.params.id, (data, doc) => {
        if (data.message=="success") {
            res.redirect("/school/")
        }
        else { console.log('Error in school delete :' + data); }
    });
});


router.get('/ajax/:id?', (req, res) => {
    teacherBal.getById(req.params.id, (data, doc) => {
        if (data.message == "success") {
            res.status(200).json(data.data)

        }
    });

});

router.get("/serverside",function (req,res){
    teacherBal.getAll(function (data) {

        // data.data["class"] = data.data["class_name"][0]["name"]
        var refData = data.data;

        for (var i = 0;i<refData.length ;i++){
            refData[i]["class"] = refData[i].class_name[0].name;
        }

        var obj={
            "draw": req.body.draw,
            "recordsTotal": data.rows,
            "recordsFiltered": data.rows,
            "data": refData
            }

        res.status(200).json(obj);
    })
})
module.exports=router;
