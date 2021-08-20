'use strict';

const MySql = require('mysql')

class Datastore{

  static connection(){
        return MySql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'P@ssw0rd',
            database: 'yamamoto'
        });
  }
}

module.exports = Datastore