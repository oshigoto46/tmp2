'use strict';


const Datastore = require('./infrastructure/Datastore')


/**
 * makeReservationCommand RPC method.
 * @param  rpc context
 * @return 
 */

function makeReservationCommand (ctx) {
  
  ctx.res = { reservationResponse: 'No Query ' + ctx.req.reservationId }

  Datastore.connection().query('insert into reservation set ?;', 
     {
      "reservationId"  : ctx.req.reservationId,
      "reservationDate": ctx.req.reservationDate,
      "doctorId"       : ctx.req.doctorId,
      "clientId"       : ctx.req.clientId,
      "reservationSlot": ctx.req.reservationSlot
     } 
      , function (err, rows, fields) {
      if (err) { 
          console.log('makeReservation err: ' + err); 
          ctx.res = { reservationResponse: '401 bad request' }
      }else{
          ctx.res = { reservationResponse: '201 created' }
      }
  });

}


module.exports = makeReservationCommand 

// main()
