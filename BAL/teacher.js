var teacherDAL=require("../DAL/teacher");
var teacherBal={
    getAll:function (callback){
        teacherDAL.getAll(function (data){
            callback(data);
        })
    },
    getForTable:function (body, callback){
        // teacherDAL.getForTable(body,function (data){
        //     callback(data);
        // })
    },
    add:function (body, callback){
        teacherDAL.add(body,function (data){
            callback(data);
        })
    },
    getById:function (id, callback){
        // teacherDAL.getById(id,function (data){
        //     callback(data);
        // })
    },
    update:function (id,callback){
        teacherDAL.update(id,function (data){
            callback(data);
        })
    },
    removeById:function (id, callback){
        teacherDAL.removeById(id,function (data){
            callback(data);
        })
    },
}
module.exports=teacherBal;
