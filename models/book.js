var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({

    name: { type: String, required: true,maxlength:50 },

});
module.exports=mongoose.model("Book",schema);