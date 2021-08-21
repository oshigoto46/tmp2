'use strict';

const MySql  = require('mysql')
const config = require('../config.js')

class Datastore{

  static connection(){

       
        //console.log("Datastoreの設定 in Datastore" + JSON.stringify(config))

        return MySql.createConnection({
            host: config.database.host,
            port: config.database.port,
            //user: config.database.auth.user,
            //password:  config.database.auth.password,
            database:  config.database.dbname,
            user: 'root',
            password: 'P@ssw0rd'
        });

  }
}

module.exports = Datastore