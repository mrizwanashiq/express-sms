const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = Schema({
    name: { type: String, required: true, maxlength: 50 },
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    roll: { type: String, required: true, maxlength: 50 },
    registration: { type: String, required: true, maxlength: 50 },
});
module.exports = mongoose.model("Student", schema);
