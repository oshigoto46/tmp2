const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const PROTO_PATH = __dirname + '/protos/reservation.proto'
const Datastore = require('./infrastructure/Datastore')

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
)


const reservationProto = grpc.loadPackageDefinition(packageDefinition)
const server = new grpc.Server()

let dataStore = new Datastore()
 
server.addService(reservationProto.reservation.Reservation.service, {
    getReseravtion: async(call, callback) => {
        ret = await (dataStore.select('select * from reservation'))
        callback(null, { reservationId: 'reservation id:' + ret[0].reservationId })
    },
    makeReservation: async(call, callback) => {
        //console.log(call.request)
        ret = await (dataStore.insert(
             {
            "reservationId"  : call.request.reservationId,
            "reservationDate": call.request.reservationDate,
            "doctorId"       : call.request.doctorId,
            "clientId"       : call.request.clientId,
            "reservationSlot": call.request.reservationSlot
           } 
        )).then(
            results =>callback(null, { success: results}) 
        ).catch(
            console.log("エラー")
        )
    }
})
server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
console.log('gRPC server running at http://127.0.0.1:50051')
server.start()
