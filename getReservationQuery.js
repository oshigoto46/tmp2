'use strict';


const Datastore = require('./infrastructure/Datastore')


/**
 * getReservationQuery RPC method.
 * @param  rpc context
 * @return 
 */

function getReservation (ctx) {
  
  ctx.res = { reservationId: 'No Query '}

  Datastore.connection().query('select * from reservation '
      , function (err, rows, fields) {
      if (err) { 
          console.log('getReseravtion err: ' + err); 
          //ctx.res = { reservationResponse: '500 Internal Server Error' }
      }else{
          console.log('name:！！！ ' + rows[0].reservationId);
          ctx.res = { reservationId: rows[0].reservationId }
      }
  });

}


module.exports = getReservation 

// main()
