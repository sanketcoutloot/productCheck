"use strict";

var bulkUpload = require("../services/bulkUploadServices");
var utilsValidation = require("../utility/utils");

const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");

const redis = require("../../common/redis");

var controllers = {
  testControllerFun: async function (req, res, next) {
    let result = await bulkUpload.testService();
    res.send(result);
  },

  bulkUpload: async function (req, res, next) {
    let jsonData = null;
    try {
      const filePath = path.join(__dirname, `../../csv/${req._fileName}`);
      console.log('filePath---', filePath);
      const file = fs.readFileSync(filePath);
      console.log('file---', file);

      let fileStringified = file.toString();

      if (fileStringified.length > 0) {
        Papa.parse(fileStringified, {
          header: true,
          dynamicTyping: true,
          complete: function (results) {
            let newData = results.data
            newData.pop()


            jsonData = newData
            console.log(JSON.stringify(newData, null, 3));
          }
        });
      }
      let finalResponse = await utilsValidation.excelValidation(jsonData);
      res.send({
        success: 1,
        data: finalResponse
      });

      // validate json
    } catch (error) {
      console.log(error);
      res.send({
        success: false,
        msg: error
      });
    }
  }
};

module.exports = controllers;