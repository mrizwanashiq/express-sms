var express = require("express");
var router=express.Router();
var studentBal=require("../BAL/student");
var classBal=require("../BAL/class");
var bookBal=require("../BAL/book");

router.get("/",function (req,res){
    classBal.getAll(function (clas){
        bookBal.getAll(function (book){
            var data = {class:clas.data,book:book.data}
            var a = data;
            res.render("student/table", {data: data});
        })
    })

})



router.post("/",function (req,res){
    studentBal.add(req.body,function (data){
        studentBal.getAll(function (data) {
            res.render("student/table", {data: data.data});
        })
    })
})

router.post("/update",function (req,res){
    studentBal.update(req.body,function (data,err){
        if (data.message=="success") {
            res.redirect("/student/")
        }
        else { console.log('Error in school update :' + data); }
    })
})
router.get('/rizwan/:id?', (req, res) => {
    studentBal.getById(req.params.id, (data, doc) => {
        if (data.message == "success") {
            res.render("addOrUpdate", {data: data.data});
        }
    });

});
router.get('/delete/:id?', (req, res) => {
    studentBal.removeById(req.params.id, (data, doc) => {
        if (data.message=="success") {
            res.redirect("/student/")
        }
        else { console.log('Error in school delete :' + data); }
    });
});


router.get('/ajax/:id?', (req, res) => {
    studentBal.getById(req.params.id, (data, doc) => {
        if (data.message == "success") {
            res.status(200).json(data.data)

        }
    });

});

router.get("/serverside",function (req,res){
    studentBal.getAll(function (data) {

        // data.data["class"] = data.data["class_name"][0]["name"]
        var refData = data.data;

        for (var i = 0;i<refData.length ;i++){
            refData[i]["class"] = refData[i].class_name[0].name;
            refData[i]["book"] = refData[i].book_name[0].name;
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
