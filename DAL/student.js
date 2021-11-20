var student=require("../models/student");
var db=require("../utility/conn");
const mongoose = require("mongoose");
const school = require("../models/school");

var studentDal={
    getAll:function (callback){
        student.aggregate([
            {
                $lookup:{
                    from:"classes",
                    localField:"class_id",
                    foreignField:"_id",
                    as:"class_name"
                }
            },
            // {   $unwind:"class_name" },
            {
                $lookup:{
                    from:"books",
                    localField:"book_id",
                    foreignField:"_id",
                    as:"book_name"
                }
            },
            { "$lookup": {
                    "from": "classes",
                    "let": { "classid": "$_id" },
                    "pipeline": [
                        { "$match": { "$expr": { "$eq": ["$party_id", "$$classid"] }}},
                        { "$lookup": {
                                "from": "addressComment",
                                "let": { "addressId": "$_id" },
                                "pipeline": [
                                    { "$match": { "$expr": { "$eq": ["$address_id", "$$addressId"] }}}
                                ],
                                "as": "address"
                            }}
                    ],
                    "as": "address"
                }},
            { "$unwind": "$address" }
            // {   $unwind:"book_name" },
        ]).then(function (data){
            var obj={message:"success",data:data}
            callback(obj)
        }).catch(function (err){
            var obj={message:"error",data:err.message}
            callback(obj)
        })
    },

    add:function (body, callback){
        var userObj=new student({
            name: body.name,
            class_id:body.class_id,
            book_id:body.book_id,
            roll: body.roll,
            registration: body.registration,

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
        student.updateOne(
            { "_id" : body.id },
            { $set: {
                    name: body.name,
                    class_id:body.class_id,
                    book_id:body.book_id,
                    roll: body.roll,
                    registration: body.registration,
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
        student.findByIdAndRemove(id).then(function (data){
            var obj={message:"success",data:data}
            callback(obj)
        }).catch(function (err){
            var obj={message:"error",data:err.message}
            callback(obj)
        })
    },

}

module.exports=studentDal
