var express = require("express");
var router=express.Router();
var bookBal=require("../BAL/book");

router.get("/",function (req,res){

        res.render("book/table", );

})



router.post("/",function (req,res){
    bookBal.add(req.body,function (data, err){
        bookBal.getAll(function (data, err) {
            res.render("book/table", {data: data.data});
        })
    })
})

router.post("/update",function (req,res){
    bookBal.update(req.body,function (data,err){
        if (data.message=="success") {
            res.redirect("/book/")
        }
        else { console.log('Error in book update :' + data); }
    })
})
router.get('/rizwa/:id?', (req, res) => {
    bookBal.getById(req.params.id, (data, doc) => {
        if (data.message == "success") {
            res.render("addOrUpdate", {data: data.data});
        }
    });

});

router.get('/delete/:id?', (req, res) => {
    bookBal.removeById(req.params.id, (data) => {
        if (data.message=="success") {
            res.redirect("/book/")
        }
        else { console.log('Error in book delete :' + data); }
    });
});


router.get('/ajax/:id?', (req, res) => {
    bookBal.getById(req.params.id, (data) => {
        if (data.message == "success") {
            res.status(200).json(data.data)

        }
    });

});

router.post("/serverside",function (req,res){
    var a = 10;
    bookBal.getForTable(req.body,function (data) {
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
