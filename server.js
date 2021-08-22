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
               //if(true){console.log(call)}
               let ret = await (this.dataStore.select(`select * from reservation where reservationId=${call.request.reservationId}`))
               .then(
                  val => 
                  { if(val.length ===1 ) 
                     { return callback(null, { responseCode: 200 , 
                                        reservationId: val[0].reservationId ,
                                        status: grpc.status.INTERNAL })
                     }
                    else if(val.length === 0) 
                     { return callback(null, { responseCode: 404 , 
                                        reservationId: null,
                                        status: grpc.status.INTERNAL })
                     }
                    else{
                        return callback(null, { responseCode: 409 , 
                        reservationId: null,
                        status: grpc.status.INTERNAL 
                     })
                    }
                  }
               )
               .catch(
                  val => {
                    return callback(null, {
                      responseCode: 503 , 
                      reservationId: null,  
                      status: grpc.status.INTERNAL 
                  })
               }
               )
            },
            makeReservation: async(call, callback) => {
               //console.log(call.request)

               if(call.request.reservationSlot <= 1 || call.request.reservationSlot >=10){
                 return callback(null, { responseCode: 400 ,
                     status: grpc.status.INTERNAL })
               }

               await (this.dataStore.insert(
                     {
                  "reservationId"  : call.request.reservationId,
                  "reservationDate": call.request.reservationDate,
                  "doctorId"       : call.request.doctorId,
                  "clientId"       : call.request.clientId,
                  "reservationSlot": call.request.reservationSlot
                  } 
               )).then(
                  val => 
                  { if(val ===1 ) 
                     { callback(null, { responseCode: 201 ,
                                        status: grpc.status.INTERNAL })
                     }
                    else{
                        callback(null, { responseCode: 500 ,
                        status: grpc.status.INTERNAL 
                     })
                    }
                  }
                ).catch(
                  err => {
                     let str = "" + err
                     // console.log(err)
                     if(str.indexOf("ER_DUP_ENTRY")>0){
                        // console.log("重複エラー")
                        callback(null, { responseCode: 409 ,
                           status: grpc.status.INTERNAL 
                        })
                     }
                     else if(str.indexOf("ER_NO_REFERENCED_ROW_2")>0){
                        // console.log("重複エラー")
                        callback(null, { responseCode: 400 ,
                           status: grpc.status.INTERNAL 
                        })
                     }
                     else{
                        console.log( "some another error" + err)
                        callback(null, { responseCode: 102 ,
                           status: grpc.status.INTERNAL 
                        })
                     }
                  }
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


