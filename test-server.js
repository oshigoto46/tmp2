const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const PROTO_PATH = __dirname + '/protos/hello.proto'
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

let ret
(async () => {
   ret = await (Datastore.execute('select * from reservation'))
   console.log("fin=======================")
   console.log(ret[0].reservationId)
})();

const helloProto = grpc.loadPackageDefinition(packageDefinition)
 
const server = new grpc.Server()

server.addService(helloProto.hello.Greeter.service, {
    sayHello: async(call, callback) => {
        ret = await (Datastore.execute('select * from reservation'))
        callback(null, { message: 'こんにちわ ID:' + ret[0].reservationId + call.request.name })
    }
})
server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
console.log('gRPC server running at http://127.0.0.1:50051')
server.start()