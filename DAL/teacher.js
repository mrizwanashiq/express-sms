var teacher=require("../models/teacher");
var db=require("../utility/conn");
const mongoose = require("mongoose");
const student = require("../models/student");

var teacherDal={
    getAll:function (callback){
        teacher.aggregate([
            {
                $lookup:{
                    from:"classes",
                    localField:"class_id",
                    foreignField:"_id",
                    as:"class_name"
                }
            }
        ]).then(function (data){
            var obj={message:"success",data:data}
            callback(obj)
        }).catch(function (err){
            var obj={message:"error",data:err.message}
            callback(obj)
        })
    },

    add:function (body, callback){
        var userObj=new teacher({
            class_id:body.class_id,
            name: body.name,
            phone: body.phone,
            email: body.email,

        });
        userObj.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data)

        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    update:function (body,callback){
        teacher.updateOne(
            { "_id" : body.id },
            { $set: {
                    class_id:body.class_id,
                    name: body.name,
                    phone: body.phone,
                    email: body.email,
                } ,
            },
            {runValidators: true}
        ).then(function (updateDate) {
            var data={message:"success",data:updateDate}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });

        // user.findOneAndUpdate({ _id: id.body._id }, id.body, { new: true }, (data, doc) => {
        //     var obj={message:"success",data:data}
        //     callback(obj)
        //
        // }).catch(function (err){
        //     var obj={message:"error",data:err.message}
        //     callback(obj)
        // });
    },
    removeById:function (id,callback){
        teacher.findByIdAndRemove(id).then(function (data){
            var obj={message:"success",data:data}
            callback(obj)
        }).catch(function (err){
            var obj={message:"error",data:err.message}
            callback(obj)
        })
    },


}

module.exports=teacherDal
