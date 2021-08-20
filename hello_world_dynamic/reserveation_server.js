const path = require('path')
const Mali = require('mali')
const MySql = require('mysql');

const PROTO_PATH = path.resolve(__dirname, '../protos/reservation.proto')
const HOSTPORT = '0.0.0.0:50051'

/**
 * Implements the SayHello RPC method.
 */

var connection = MySql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'P@ssw0rd',
  database: 'yamamoto'
});


function sayHello (ctx) {
  
  ctx.res = { reservationResponse: 'No Query ' + ctx.req.reservationId }

  connection.query('insert into reservation set ?;', {"reservationId" : ctx.req.reservationId} , function (err, rows, fields) {
      if (err) { 
          console.log('err: ' + err); 
          ctx.res = { reservationResponse: '401 bad request' }
      }else{
          console.log("sql query" + JSON.stringify(rows[0]))
          ctx.res = { reservationResponse: '201 created' }
      }
  });

}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main () {
  const app = new Mali(PROTO_PATH, 'Reservation')
  app.use({ sayHello })
  app.start(HOSTPORT)
  console.log(`Greeter service running @ ${HOSTPORT}`)
}

main()
