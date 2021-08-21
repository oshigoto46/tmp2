'use strict';

const mysql  = require('mysql')
const config = require('../config.js')
const util = require('util');

class Datastore{

  static async execute(sqlStatement){

        //console.log("Datastore config" + JSON.stringify(config))
        var pool = mysql.createPool({
          host: config.database.host,
          port: config.database.port,
          //user: config.database.auth.user,
          //password:  config.database.auth.password,
          database:  config.database.dbname,
          user: 'root',
          password: 'P@ssw0rd'
        })

        pool.query = util.promisify(pool.query)

        try {
          var records = await pool.query(sqlStatement);
          pool.end();// ←これです
          return records;
        } catch (err) {
          throw new Error(err)
        }

   

  }
}

module.exports = Datastore