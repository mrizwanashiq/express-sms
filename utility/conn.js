var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/sms",{ useNewUrlParser: true,useUnifiedTopology: true,});
module.exports={
    'school':require("../models/school"),
    // 'class':require("../models/class"),
    // 'teacher':require("../models/teacher"),
    // 'book':require("../models/book"),
    // 'user':require("../models/user"),
}
