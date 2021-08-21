const Mali = require('mali')
const config = require('./config.js')
const path = require('path')

//
const PROTO_PATH = path.resolve(__dirname, './protos/reservation.proto')
const makeReseravtion = require('./reservationServer')
/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */

 class Server {

     constructor(){
        this.app = new Mali(PROTO_PATH, 'Reservation')
        this.preReadingProto()
     }

     preReadingProto(){

         // more readings .. TODO
         // more readings .. TODO
         // more readings .. TODO

        this.app.use({ makeReseravtion })
     }

     serverStart () {
        this.app.start(config.app.host + ":" + config.app.port)
        console.log(`Reservation service running @` + config.app.host + ":" + config.app.port)
      }

      serverStop(){
        this.app.close().then(() => console.log('server(s) shut down.'))
      }

 }

 module.exports = Server


