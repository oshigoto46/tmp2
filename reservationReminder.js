'use strict';

const cron = require('node-cron');

function reminder(){
  cron.schedule('* */1 * * *', () => console.log('every hour execution'));
  //cron.schedule('* * * * *', () => console.log('every hour execution'));
}



module.exports = reminder