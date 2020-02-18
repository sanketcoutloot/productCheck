"use strict";

var mongoose = require("mongoose");
try {
    var mongoConnect = require("/etc/coutloot/mongo/mongoConnect");
} catch (e) {
    if (!mongoConnect) {
        console.log("Mongo connection error");
        process.exit(0);
    }
}

var dbCreds = {
    userName: "sanket",
    userSecret: "test",
    database: "commonDb",
    access: "readWrite",
    applicationId: "t001"
};

var connectionObject = mongoConnect.getConnection(
    dbCreds.userName,
    dbCreds.userSecret,
    dbCreds.database,
    dbCreds.access,
    dbCreds.applicationId,
    mongoose
);

var connection = connectionObject.connection;

var counterSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            default: "pageCounter"
        },
        count: {
            type: Number,
            required: true,
            default: 0
        }
    },
    { strict: false }
);

module.exports = connection.model("counter", counterSchema, "counter");
