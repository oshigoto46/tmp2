const Mali = require('mali')
const config = require('./config.js')
const path = require('path')


// const PROTO_PATH = path.resolve(__dirname, './protos/reservation.proto') TODO
const PROTO_PATH = path.resolve(__dirname, './protos/helloworld.proto')
const makeReservation = require('./makeReservationCommand')
const getReseravtion = require('./getReservationQuery')
const sayHello = require('./test.js')
/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */

 class Server {


     constructor(){
        this.app = new Mali(PROTO_PATH, 'Greeter') //TODO
        console.log("sayHello" + sayHello)
        this.app.use({ sayHello })
     }

     preReadingProto(){

         // more readings .. TODO
         // more readings .. TODO
         // more readings .. TODO
        //this.app.use({ makeReservation ,getReseravtion  }) TODO
        
     }

     serverStart () {
        //this.app.start(config.app.host + ":" + config.app.port)
        this.app.start('0.0.0.0:3000')
        console.log(this.app.name + ` service running @` + config.app.host + ":" + config.app.port)
      }

      serverStop(){
        this.app.close().then(() => console.log('server(s) shut down.'))
      }

 }

 module.exports = Server


