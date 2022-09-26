const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = Schema({

    name: { type: String, required: true, maxlength: 50 },
    address: { type: String, maxlength: 50 },
    phone: { type: String, maxlength: 50 },
    website: { type: String, maxlength: 50 },

});
module.exports = mongoose.model("School", schema);
