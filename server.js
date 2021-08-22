const config = require('./config.js')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const Datastore = require('./infrastructure/Datastore')

class Server {

     constructor(proto_path = '/protos/reservation.proto'){

         this.proto_path = __dirname +  proto_path;
         this.server = new grpc.Server()
         this.dataStore = new Datastore()
         this.reservationProto = grpc.loadPackageDefinition(
            protoLoader.loadSync(
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
         this.server.addService(this.reservationProto.reservation.Reservation.service, {
            getReseravtion: async(call, callback) => {
               let ret = await (this.dataStore.select('select * from reservation'))
               .then(
                 //val => console.log("受け取り側で受け取ったやで"+val)
                 val => callback(null, { reservationId: 'reservation id:' + val[0].reservationId })
                // callback(null, { reservationId: 'reservation id:' + ret[0].reservationId })
               )
               .catch(
                  e => console.log( "受け取り側でerrroやで" + e)
               )
            },
            makeReservation: async(call, callback) => {
               //console.log(call.request)
               await (this.dataStore.insert(
                     {
                  "reservationId"  : call.request.reservationId,
                  "reservationDate": call.request.reservationDate,
                  "doctorId"       : call.request.doctorId,
                  "clientId"       : call.request.clientId,
                  "reservationSlot": call.request.reservationSlot
                  } 
               )).then(
                  val => console.log("受け取り側で受け取ったやで"+val)
                 // callback(null, { reservationId: 'reservation id:' + ret[0].reservationId })
                ).catch(
                  e => console.log( "受け取り側でerrroやで" + e)
                  //results =>callback(null, { success: results}) 
               )
            }
        })
        this.server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
        console.log('gRPC server running at http://127.0.0.1:50051')
        this.server.start()
      }

      serverStop(){
        this.server.close().then(() => console.log('server(s) shut down.'))
      }

}

 module.exports = Server


