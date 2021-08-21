var path = require('path')
const protoLoader = require('@grpc/proto-loader')
const grpc = require('grpc')

const PROTO_PATH = path.resolve(__dirname, './protos/helloworld.proto')

const pd = protoLoader.loadSync(PROTO_PATH)
const loaded = grpc.loadPackageDefinition(pd)
const hello_proto = loaded.helloworld

function main () {
  var client = new hello_proto.Greeter('localhost:3000', grpc.credentials.createInsecure())
  var user = 'world'
  client.sayHello({ name: user }, function (err, response) {
    console.log('Greeting:', response)
  })
}

main()
