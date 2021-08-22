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
          console.log("sql 正常かどう")
          return records
        } catch (err) {
          console.log("sql 異常かどう")
          throw new Error(err)
        } finally{
          console.log("finallyは呼び出されている")
          this.pool.end();
        }
  }

  async insert(values){

      try {
        await this.pool.query("INSERT INTO reservation set ? ", values)
        console.log("sql 正常かどう")
        return true
      } catch (err) {
        console.log("sql 異常かどう")
        throw new Error(err)
      } finally{
        console.log("finallyは呼び出されている")
        this.pool.end();
      }
 }

}
 
  


module.exports = Datastore