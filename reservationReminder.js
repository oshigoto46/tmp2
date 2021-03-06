"use strict";

const { nil } = require("highland");
const cron = require("node-cron");
const Datastore = require("./infrastructure/datastore");

const mysql = require("mysql");
const config = require("./config.js");
const util = require("util");
const promisify = require("util").promisify;

let pool = mysql.createPool({
  host: config.database.host,
  port: config.database.port,
  //user: config.database.auth.user,
  //password:  config.database.auth.password,
  database: config.database.dbname,
  user: "root",
  password: "P@ssw0rd",
});

pool.query = util.promisify(pool.query);

function _2hoursBeforeSlot(date) {
  //console.log("date"+ date)
  let _2hoursAfterSlot;
  switch (date.getHours()) {
    case 6:
      _2hoursAfterSlot = 1; // time slot 8-9
      break;
    case 7:
      _2hoursAfterSlot = 2; // time slot 9-10
      break;
    case 8:
      _2hoursAfterSlot = 3; // time slot 10-11
      break;
    case 9:
      _2hoursAfterSlot = 4; // time slot 11-12
      break;
    case 10:
      _2hoursAfterSlot = 5; // time slot 12-13
      break;
    case 11:
      _2hoursAfterSlot = 6; // time slot 13-14
      break;
    case 12:
      _2hoursAfterSlot = 7; // time slot 14-15
      break;
    case 13:
      _2hoursAfterSlot = 8; // time slot 15-16
      break;
    case 14:
      _2hoursAfterSlot = 9; // time slot 16-17
      break;
    case 15:
      _2hoursAfterSlot = 10; // time slot 17-18
      break;
    default:
      _2hoursAfterSlot = 100000000000;
      break;
  }
  return _2hoursAfterSlot;
}
async function reminder(date) {
  console.log("remindar start=====");
  //console.log("time slot" + _2hoursBeforeSlot(date))
  let rows = await pool.query(
    `select * from reservation where reservationSlot=${_2hoursBeforeSlot(date)}`
  );
  let ret = Object.values(JSON.parse(JSON.stringify(rows)));
  //console.log(ret)
  return ret;
}

cron.schedule("* */1 * * *", async () => {
  await reminder(new Date()).then((val) => {
    console.log("reminder" + JSON.stringify(val));
  });
});
module.exports = reminder;
