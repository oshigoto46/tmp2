const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const PROTO_PATH = __dirname + '/protos/reservation.proto'
 
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
 
const client = new reservationProto.reservation.Reservation('127.0.0.1:50051', grpc.credentials.createInsecure())

client.GetReseravtion(
    {
       reservationId:311 
    }, 
    (error, response) => {
            if (!error) {
            // console.log(response)
                console.log(response.reservationId) //こんにちわ ID:1太郎
            } else {
                console.error(error)
            }
     }
)

 
// client.MakeReservation(
//     {  reservationId   : '21' , 
// 　　　　reservationDate : "20200101",
//        doctorId        : '2',
//        clientId        : '3',
//        reservationSlot : '22'
//     }, 
//     (error, response) => {
//             if (!error) {
//                 console.log("make reservation")
//                 console.log(response)
//                 //console.log(response.reservationId) //こんにちわ ID:1太郎
//             } else {
//                 console.error(error)
//             }
//     }
// )