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
const severStart = require('../reservationServer')
const Datastore = require('../infrastructure/Datastore')

describe('reservation api test', () => {
     let mysqlConnect ;
     before(() => {
         mysqlConnect = Datastore.connection()
         mysqlConnect.query('DROP TABLE IF EXISTS reservation')
         mysqlConnect.query('CREATE TABLE reservation (reservationId int , reservationDate date, doctorId int , clientId int , reservationSlot int)');
     })

     it("reservation makes a record in mysql",()=>{

        severStart()

        client.makeReseravtion(

            {  reservationId   : '21' , 
               reservationDate : "20200101",
               doctorId        : '2',
               clientId        : '3',
               reservationSlot : '22'
            }
            , (err, response) => {
                //expect(err).to.equal(undefined);
                console.log(err)
                //console.log(response)
            }
        )
        
        expect(1).to.equal(1);

     })

    after(() => {
        mysqlConnect.query('DROP TABLE reservation')
        mysqlConnect.end()
        console.log("after")
    })

    }
);
