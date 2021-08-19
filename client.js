const path = require('path')
const Mali = require('Mali')
const pl = require('@grpc/proto-loader')
const grpc = require('@grpc/grpc-js')

const PROTO_PATH = path.resolve(__dirname, "./protos/helloworld.proto")

const pd = pl.loadSync(PROTO_PATH)
const helloproto = grpc.loadPackageDefinition(pd).helloworld
const client = new helloproto.Greeter("127.0.0.1:50051", grpc.credentials.createInsecure())

client.sayHello({ name: 'Hoge' }, (err, response) => {
    console.log(response)
})