const clas = require("../models/class");
const db = require("../utility/conn");

const classDal = {
    getAll: function (callback) {
        clas.aggregate([
            {
                $lookup: {
                    from: "courses",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "course"
                }
            }
        ]).then(function (data) {
            const obj = { message: "success", data: data }
            callback(obj)
        }).catch(function (err) {
            const obj = { message: "error", data: err.message }
            callback(obj)
        })
        // user.find().then(function (data){
        //     const obj={message:"success",data:data}
        //     callback(obj)
        // }).catch(function (err){
        //     const obj={message:"error",data:err.message}
        //     callback(obj)
        // })
    },
    getForTable: function (body, callback) {
        const search = body["search[value]"]
        const reg = new RegExp(search, "g");
        const sortOrder = body["order[0][dir]"];
        const columnNumber = body["order[0][column]"]
        const columnName = body["columns[" + columnNumber + "][data]"]
        const sortCol = sortOrder == "asc" ? 1 : -1
        const sortObj = {};
        sortObj[columnName] = sortCol
        clas.aggregate([
            // {$match:{
            //         $or:[{first_name:reg},{last_name:reg}]
            //     }
            // },
            { $sort: sortObj },
            { $skip: parseInt(body.start) },
            { $limit: parseInt(body.length) },



        ]).then(function (data) {
            clas.count().then(function (rows) {
                const obj = { message: "success", data: data, rows: rows }
                callback(obj)
            }).catch(function (err) {
                const obj = { message: "error", data: err.message }
                callback(obj)
            })

        }).catch(function (err) {
            const obj = { message: "error", data: err.message }
            callback(obj)
        })

        // user.find().skip(parseInt(body.start)).limit(parseInt(body.length)).then(function (data){
        //     user.count().then(function (rows){
        //         const obj={message:"success",data:data,rows:rows}
        //         callback(obj)
        //     }).catch(function (err){
        //         const obj={message:"error",data:err.message}
        //         callback(obj)
        //     })
        //
        // }).catch(function (err){
        //     const obj={message:"error",data:err.message}
        //     callback(obj)
        // })
    },
    add: function (body, callback) {
        const obj = new clas({
            name: body.name,
        });
        obj.save().then(function (savedData) {
            const data = { message: "success", data: savedData }
            const s = 1;
            callback(data)

        }).catch(function (err) {
            const arr = { message: "error", data: err.message }
            callback(arr);
        })
    },
    getById: function (id, callback) {
        clas.findById(id).then(function (data) {
            const obj = { message: "success", data: data }
            callback(obj)
        }).catch(function (err) {
            const obj = { message: "error", data: err.message }
            callback(obj)
        })
    },
    update: function (body, callback) {
        clas.updateOne(
            { "_id": body.id },
            {
                $set: {
                    name: body.name,

                },
            },
            { runValidators: true }
        ).then(function (updateDate) {
            const data = { message: "success", data: updateDate }
            callback(data)
        }).catch(function (err) {
            const data = { message: "error", data: err.message }
            callback(data);
        });

        // user.findOneAndUpdate({ _id: id.body._id }, id.body, { new: true }, (data, doc) => {
        //     const obj={message:"success",data:data}
        //     callback(obj)
        //
        // }).catch(function (err){
        //     const obj={message:"error",data:err.message}
        //     callback(obj)
        // });
    },
    removeById: function (id, callback) {
        clas.findByIdAndRemove(id).then(function (data) {
            const obj = { message: "success", data: data }
            callback(obj)
        }).catch(function (err) {
            const obj = { message: "error", data: err.message }
            callback(obj)
        })
    },
}

module.exports = classDal
