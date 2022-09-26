const bookDAL = require("../DAL/book");
const bookBal = {
    getAll: function (callback) {
        bookDAL.getAll(function (data) {
            callback(data);
        })
    },
    getForTable: function (body, callback) {
        bookDAL.getForTable(body, function (data) {
            callback(data);
        })
    },
    add: function (body, callback) {
        bookDAL.add(body, function (data) {
            callback(data);
        })
    },
    getById: function (id, callback) {
        bookDAL.getById(id, function (data) {
            callback(data);
        })
    },
    update: function (id, callback) {
        bookDAL.update(id, function (data) {
            callback(data);
        })
    },
    removeById: function (id, callback) {
        bookDAL.removeById(id, function (data) {
            callback(data);
        })
    },
}
module.exports = bookBal;
