const schoolDAL = require("../DAL/school");
const schoolBal = {
    getAll: function (callback) {
        schoolDAL.getAll(function (data) {
            callback(data);
        })
    },
    getForTable: function (body, callback) {
        schoolDAL.getForTable(body, function (data) {
            callback(data);
        })
    },
    add: function (body, callback) {
        schoolDAL.add(body, function (data) {
            callback(data);
        })
    },
    getById: function (id, callback) {
        schoolDAL.getById(id, function (data) {
            callback(data);
        })
    },
    update: function (id, callback) {
        schoolDAL.update(id, function (data) {
            callback(data);
        })
    },
    removeById: function (id, callback) {
        schoolDAL.removeById(id, function (data) {
            callback(data);
        })
    },
}
module.exports = schoolBal;
