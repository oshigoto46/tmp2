'use strict';

const cron = require('node-cron');
cron.schedule('0 */1 * * *', () => console.log('毎分実行'));

function makeReseravtion (ctx) {


}
