const teacher = require("../models/teacher");
const db = require("../utility/conn");
const mongoose = require("mongoose");
const student = require("../models/student");

const teacherDal = {
    getAll: function (callback) {
        teacher.aggregate([
            {
                $lookup: {
                    from: "classes",
                    localField: "class_id",
                    foreignField: "_id",
                    as: "class_name"
                }
            }
        ]).then(function (data) {
            const obj = { message: "success", data: data }
            callback(obj)
        }).catch(function (err) {
            const obj = { message: "error", data: err.message }
            callback(obj)
        })
    },

    add: function (body, callback) {
        const userObj = new teacher({
            class_id: body.class_id,
            name: body.name,
            phone: body.phone,
            email: body.email,

        });
        userObj.save().then(function (savedData) {
            const data = { message: "success", data: savedData }
            callback(data)

        }).catch(function (err) {
            const arr = { message: "error", data: err.message }
            callback(arr);
        })
    },

    update: function (body, callback) {
        teacher.updateOne(
            { "_id": body.id },
            {
                $set: {
                    class_id: body.class_id,
                    name: body.name,
                    phone: body.phone,
                    email: body.email,
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
        teacher.findByIdAndRemove(id).then(function (data) {
            const obj = { message: "success", data: data }
            callback(obj)
        }).catch(function (err) {
            const obj = { message: "error", data: err.message }
            callback(obj)
        })
    },


}

module.exports = teacherDal
