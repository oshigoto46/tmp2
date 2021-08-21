'use strict';

const expect    = require("chai").expect;
const path = require('path')
const pl   = require('@grpc/proto-loader')
const grpc = require('@grpc/grpc-js')

const PROTO_PATH = path.resolve(__dirname, "../protos/reservation.proto")
const pd         = pl.loadSync(PROTO_PATH)

const config     = require('../config')

const reservation = grpc.loadPackageDefinition(pd).reservation
const client = new reservation.Reservation(config.app.host + ":" + config.app.port, grpc.credentials.createInsecure())
const Server = require('../server')
const Datastore = require('../infrastructure/Datastore')

describe('reservation api test', () => {
     let mysqlConnect ;
     let server ;
     beforeAll(() => {
         console.log("======DB準備==============")
         mysqlConnect = Datastore.connection()
         mysqlConnect.query('DROP TABLE IF EXISTS reservation')
         mysqlConnect.query('CREATE TABLE reservation (reservationId int , reservationDate date, doctorId int , clientId int , reservationSlot int)');
         server = new Server()
     })

     test("reservation makes by api",()=>{

        server.serverStart()

        client.MakeReservation(

            {  reservationId   : '21' , 
               reservationDate : "20200101",
               doctorId        : '2',
               clientId        : '3',
               reservationSlot : '22'
            }
            , (err, response) => {
                 expect(err).to.equal(null);
                 //console.log(err)
                //console.log(response)
            }
        )
       
        expect(1).to.equal(1);

     })

     test("reservation checks by api when its done",()=>{
          client.getReseravtion( 

            {  reservationId   : '21' } , 
                (err, response) => {
                   //console.log(err)
                   expect(err).to.equal(null);
                   //console.log(response)
            }
           )
        expect(1).to.equal(1);
     })

    afterAll(() => {
        console.log("======DB廃棄==============")
        //mysqlConnect.query('DROP TABLE reservation')
        mysqlConnect.end()
        //server.serverStop()
        console.log("after")
    })

    }
);
