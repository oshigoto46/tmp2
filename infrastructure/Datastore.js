'use strict';

const mysql  = require('mysql')
const config = require('../config.js')
const util = require('util');
const promisify = require("util").promisify;

class Datastore{

  constructor(){
    this.pool = mysql.createPool({
      host: config.database.host,
      port: config.database.port,
      //user: config.database.auth.user,
      //password:  config.database.auth.password,
      database:  config.database.dbname,
      user: 'root',
      password: 'P@ssw0rd'
    })
    this.pool.query = util.promisify(this.pool.query)
  }
  
  
   async select(sqlStatement){

        try {
          let records = await this.pool.query(sqlStatement)
          console.log(`sql select working records:${records.length} rows`)
          return records
        } catch (err) {
          console.log("sql select is failed with some errors acrroding to DB")
          throw new Error(err)
        } finally{
          this.pool.end();
        }
  }

  async insert(values){

      try {
        await this.pool.query("INSERT INTO reservation set ? ", values)
        console.log("sql insert is working")
        return true
      } catch (err) {
        console.log("sql insert is failed with some errors")
        throw new Error(err)
      } finally{
        this.pool.end();
      }
 }

}
 
  


module.exports = Datastore