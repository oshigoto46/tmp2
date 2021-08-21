'use strict';

const path = require('path')
const pl = require('@grpc/proto-loader')
const grpc = require('@grpc/grpc-js')
const PROTO_PATH = path.resolve(__dirname, "./protos/reservation.proto")
const config = require('./config.js')

const pd = pl.loadSync(PROTO_PATH)
const reservation = grpc.loadPackageDefinition(pd).reservation
const client = new reservation.Reservation(config.app.host + ":" + config.app.port, grpc.credentials.createInsecure())

client.makeReseravtion(

    {  reservationId   : '21' , 
       reservationDate : "20200101",
       doctorId        : '2',
       clientId        : '3',
       reservationSlot : '22'
    }
    , (err, response) => {
      console.log("makeReseravtion err:" + err)
      console.log("makeReseravtion res:" + JSON.stringify(response))
   }
)