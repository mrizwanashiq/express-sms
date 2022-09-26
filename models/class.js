const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = Schema({

    name: { type: String, required: true, maxlength: 50 },

});
module.exports = mongoose.model("Class", schema);
