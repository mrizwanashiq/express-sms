const student = require("../models/student");
const db = require("../utility/conn");
const mongoose = require("mongoose");
const school = require("../models/school");

const studentDal = {
    getAll: function (callback) {
        student.aggregate([
            {
                $lookup: {
                    from: "classes",
                    localField: "class_id",
                    foreignField: "_id",
                    as: "class_name"
                }
            },
            // {   $unwind:"class_name" },
            {
                $lookup: {
                    from: "books",
                    localField: "book_id",
                    foreignField: "_id",
                    as: "book_name"
                }
            },
            // {
            //     $lookup:{
            //         from:"books",
            //         let:{bookId:"$_id"},
            //         pipeline:[{$match: { $expr: { $eq: ["$bookId", "$$bookId"] }}},
            //             {
            //                 $lookup:{
            //                     from:"productitems",
            //                     let:{itemId:"$itemId"},
            //                     pipeline:[{$match: { $expr: { $eq: ["$_id", "$$itemId"] }}},
            //                     ],
            //                     as:"productName",
            //                 }
            //             },
            //             { $unwind : { path: "$productName", preserveNullAndEmptyArrays: true } },
            //         ],
            //         as:"bookData",
            //     },
            // },
            { "$unwind": "$address" }
            // {   $unwind:"book_name" },
        ]).then(function (data) {
            const obj = { message: "success", data: data }
            callback(obj)
        }).catch(function (err) {
            const obj = { message: "error", data: err.message }
            callback(obj)
        })
    },
    getAllNew: function (callback) {
        student.aggregate([
            {
                $lookup: {
                    from: "classes",
                    let: { classid: "$class_id" },
                    pipeline: [
                        {
                            $match: { $expr: { $eq: ["$_id", "$$classid"] } }
                        },
                        {
                            $lookup: {
                                from: "teachers",
                                let: { teacher: "$itemId" },
                                pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$itemId"] } } },
                                ],
                                as: "productName",
                            }
                        },
                        { $unwind: { path: "$productName", preserveNullAndEmptyArrays: true } },
                    ],
                    as: "bookData",
                },
            }, {
                $lookup: {
                    from: "books",
                    localField: "book_id",
                    foreignField: "_id",
                    as: "book_name"
                }
            },
            {
                "$lookup": {
                    "from": "classes",
                    "let": { "classid": "$_id" },
                    "pipeline": [
                        { "$match": { "$expr": { "$eq": ["$party_id", "$$classid"] } } },
                        {
                            "$lookup": {
                                "from": "addressComment",
                                "let": { "addressId": "$_id" },
                                "pipeline": [
                                    { "$match": { "$expr": { "$eq": ["$address_id", "$$addressId"] } } }
                                ],
                                "as": "address"
                            }
                        }
                    ],
                    "as": "address"
                }
            },
            { "$unwind": "$address" }
            // {   $unwind:"book_name" },
        ]).then(function (data) {
            const obj = { message: "success", data: data }
            callback(obj)
        }).catch(function (err) {
            const obj = { message: "error", data: err.message }
            callback(obj)
        })
    },

    add: function (body, callback) {
        const userObj = new student({
            name: body.name,
            class_id: body.class_id,
            book_id: body.book_id,
            roll: body.roll,
            registration: body.registration,

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
        student.updateOne(
            { "_id": body.id },
            {
                $set: {
                    name: body.name,
                    class_id: body.class_id,
                    book_id: body.book_id,
                    roll: body.roll,
                    registration: body.registration,
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
        student.findByIdAndRemove(id).then(function (data) {
            const obj = { message: "success", data: data }
            callback(obj)
        }).catch(function (err) {
            const obj = { message: "error", data: err.message }
            callback(obj)
        })
    },

}

module.exports = studentDal
