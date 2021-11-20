var studentDAL=require("../DAL/student");
var studentBal={
    getAll:function (callback){
        studentDAL.getAll(function (data){
            callback(data);
        })
    },
    getForTable:function (body, callback){
        // teacherDAL.getForTable(body,function (data){
        //     callback(data);
        // })
    },
    add:function (body, callback){
        studentDAL.add(body,function (data){
            callback(data);
        })
    },
    getById:function (id, callback){
        // teacherDAL.getById(id,function (data){
        //     callback(data);
        // })
    },
    update:function (id,callback){
        studentDAL.update(id,function (data){
            callback(data);
        })
    },
    removeById:function (id, callback){
        studentDAL.removeById(id,function (data){
            callback(data);
        })
    },
}
module.exports=studentBal;
