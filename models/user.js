var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    name: { type: String, required: true,maxlength:50 },
    username: { type: String, required: true,maxlength:50 },
    password: { type: String, required: true,maxlength:50 },

});
module.exports=mongoose.model("User",schema);
