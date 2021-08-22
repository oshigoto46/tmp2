'use strict';
const dotenv  = require("dotenv")
dotenv.config(); 

const setConfig = {
    production : {
       database: {
        host: 'localhost',
        dbname: 'reservation_prod',
        port: 3306,
        auth: {
          user: 'root',
          pass: 'P@ssw0rd'
        }
      },
      app : {
        host: 'localhost',
        port: '3000'
      }
    },
    development : {
      database: {
       host: 'localhost',
       dbname: 'reservation_dev',
       port: 3306,
       auth: {
         user: 'root',
         pass: 'P@ssw0rd'
       }
     },
      app : {
        host: 'localhost',
        port: '50051'
      }
   }
}

const config = setConfig[process.env.TARGET_ENV];
module.exports = config
