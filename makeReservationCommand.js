'use strict';


const Datastore = require('./infrastructure/Datastore')


/**
 * makeReservationCommand RPC method.
 * @param  rpc context
 * @return 
 */

function makeReservation (ctx,callback) {
  
  ctx.res = { reservationId: 'XXXXX' + ctx.req.reservationId }

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
          ctx.res = { reservationId: '401 bad request' }
      }else{
          console.log("DB" + Date.now())
          console.log("DB問い合わせ成功")
          ctx.res = { reservationId: '問い合わせパラメータをとりまd fdanofdaniofnaof詰め込む' + ctx.req.reservationId }
          console.log(ctx.res)
      }
      callback(null,)
  });

  

}

console.log(makeReservation)
module.exports = makeReservation 

// main()
