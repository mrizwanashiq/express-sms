var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    class_id:{type: mongoose.Schema.Types.ObjectId,ref:"Class",required:true},
    name: { type: String, required: true,maxlength:50 },
    phone: { type: String, required: true,maxlength:50 },
    email: { type: String, required: true,maxlength:50 },

});
module.exports=mongoose.model("Teacher",schema);
