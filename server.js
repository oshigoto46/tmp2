const config = require('./config.js')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const 

const makeReservation = require('./makeReservationCommand')
const getReseravtion = require('./getReservationQuery')
const sayHello = require('./test.js')
/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */

const reservationpackageDefinition = protoLoader.loadSync(
   RESERVATION_PROTO_PATH,
   {
       keepCase: true,
       longs: String,
       enums: String,
       defaults: true,
       oneofs: true
   }
)

class Server {


     constructor(proto_path = './protos/reservation.proto'){
         this.proto_path = __dirname +  proto_path;
         this.server = new grpc.Server()
         this.proto = grpc.loadPackageDefinition(
            rotoLoader.loadSync(
               this.proto_path,
               {
                   keepCase: true,
                   longs: String,
                   enums: String,
                   defaults: true,
                   oneofs: true
               }
         )
       )
     }

     serverStart () {
        this.app.start('0.0.0.0:3000')
        console.log(this.app.name + ` service running @` + config.app.host + ":" + config.app.port)
      }

      serverStop(){
        this.app.close().then(() => console.log('server(s) shut down.'))
      }

}

 module.exports = Server


