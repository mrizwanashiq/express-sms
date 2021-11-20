var school=require("../models/school");
var db=require("../utility/conn");
var mongoose =require("mongoose")
var schoolDal={
    getAll:function (callback){
        school.aggregate([
            {
                $lookup:{
                    from:"courses",
                    localField:"_id",
                    foreignField:"user_id",
                    as:"course"
                }
            }
        ]).then(function (data){
            var obj={message:"success",data:data}
            callback(obj)
        }).catch(function (err){
            var obj={message:"error",data:err.message}
            callback(obj)
        })
        // user.find().then(function (data){
        //     var obj={message:"success",data:data}
        //     callback(obj)
        // }).catch(function (err){
        //     var obj={message:"error",data:err.message}
        //     callback(obj)
        // })
    },
    getForTable:function (body, callback){
        var search=body["search[value]"]
        var reg=new RegExp(search,"g");
        var sortOrder=body["order[0][dir]"];
        var columnNumber=body["order[0][column]"]
        var columnName=body["columns["+columnNumber+"][data]"]
        var sortCol=sortOrder=="asc"?1:-1
        var sortObj={};
        sortObj[columnName]=sortCol
        school.aggregate([
            // {$match:{
            //         $or:[{first_name:reg},{last_name:reg}]
            //     }
            // },
            { $sort : sortObj },
            { $skip : parseInt(body.start) },
            { $limit : parseInt(body.length) },



        ]).then(function (data){
                school.count().then(function (rows){
                            var obj={message:"success",data:data,rows:rows}
                            callback(obj)
                        }).catch(function (err){
                            var obj={message:"error",data:err.message}
                            callback(obj)
                        })

        }).catch(function (err){
            var obj={message:"error",data:err.message}
            callback(obj)
        })

        // user.find().skip(parseInt(body.start)).limit(parseInt(body.length)).then(function (data){
        //     user.count().then(function (rows){
        //         var obj={message:"success",data:data,rows:rows}
        //         callback(obj)
        //     }).catch(function (err){
        //         var obj={message:"error",data:err.message}
        //         callback(obj)
        //     })
        //
        // }).catch(function (err){
        //     var obj={message:"error",data:err.message}
        //     callback(obj)
        // })
    },
    add:function (body, callback){
        var userObj=new school({
            name: body.name,
            address: body.address,
            phone: body.phone,
            website: body.website,

        });
        userObj.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            var s = 1;
            callback(data)

        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    getById:function (id, callback){
        school.findById(id).then(function (data){
            var obj={message:"success",data:data}
            callback(obj)
        }).catch(function (err){
            var obj={message:"error",data:err.message}
            callback(obj)
        })
    },
    update:function (body,callback){
        school.updateOne(
            { "_id" : body.id },
            { $set: {
                    name: body.name,
                    address: body.address,
                    phone: body.phone,
                    website: body.website
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
        school.findByIdAndRemove(id).then(function (data){
            var obj={message:"success",data:data}
            callback(obj)
        }).catch(function (err){
            var obj={message:"error",data:err.message}
            callback(obj)
        })
    },
}

module.exports=schoolDal
