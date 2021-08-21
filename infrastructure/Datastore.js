'use strict';

const mysql  = require('mysql')
const config = require('../config.js')
const util = require('util');

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
          var records = await this.pool.query(sqlStatement);
          this.pool.end();// ←これです
          return records;
        } catch (err) {
          throw new Error(err)
        }
  }

  async insert(values){
       try{
            mysql.pool.query("INSERT INTO todo (`name`) VALUES (?)", values, function( err, results ) {
          })
        }
        catch (err) {
            throw new Error(err)
        }
  }
 }
 
  


module.exports = Datastore