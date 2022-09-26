const classDAL = require("../DAL/class");
const classBal = {
    getAll: function (callback) {
        classDAL.getAll(function (data) {
            callback(data);
        })
    },
    getForTable: function (body, callback) {
        classDAL.getForTable(body, function (data) {
            callback(data);
        })
    },
    add: function (body, callback) {
        classDAL.add(body, function (data) {
            callback(data);
        })
    },
    getById: function (id, callback) {
        classDAL.getById(id, function (data) {
            callback(data);
        })
    },
    update: function (id, callback) {
        classDAL.update(id, function (data) {
            callback(data);
        })
    },
    removeById: function (id, callback) {
        classDAL.removeById(id, function (data) {
            callback(data);
        })
    },
}
module.exports = classBal;
