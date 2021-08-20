const dotenv  = require("dotenv")
dotenv.config(); 

const setConfig = {
    production : {
       database: {
        host: 'localhost',
        dbname: 'yamamoto',
        port: 3306,
        auth: {
          user: 'root',
          pass: 'P@ssw0rd'
        }
      }
    },
    development : {
      database: {
       host: 'localhost',
       dbname: 'yamamoto',
       port: 3306,
       auth: {
         user: 'root',
         pass: 'P@ssw0rd'
       }
     }
   }
}

const config = setConfig[process.env.TARGET_ENV];
module.exports = config
