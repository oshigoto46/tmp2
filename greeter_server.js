const path = require('path')
const Mali = require('mali')

const PROTO_PATH = path.resolve(__dirname, './protos/helloworld.proto')
const HOSTPORT = '0.0.0.0:3000'

/**
 * Implements the SayHello RPC method.
 */
function sayHello (ctx) {
  ctx.res = { message: 'Hello Response' + ctx.req.name }
}

// /**
//  * Starts an RPC server that receives requests for the Greeter service at the
//  * sample server port
//  */

class Server{

  constructor(){
     this.app = new Mali(PROTO_PATH, 'Greeter')
     this.app.use({ sayHello })
     this.app.start(HOSTPORT)
     console.log(`Greeter service running @ ${HOSTPORT}`)
  }

}
function main () {
    console.log(sayHello)
    new Server()
}

main()
module.exports = sayHello
