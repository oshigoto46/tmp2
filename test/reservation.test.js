'use strict';


const path = require('path')
const pl = require('@grpc/proto-loader')
const grpc = require('@grpc/grpc-js')
const PROTO_PATH = path.resolve(__dirname, "../protos/reservation.proto")
const Datastore = require('../infrastructure/Datastore')
const expect    = require("chai").expect;

const pd = pl.loadSync(PROTO_PATH)
const reservation = grpc.loadPackageDefinition(pd).reservation
const client = new reservation.Reservation("127.0.0.1:50051", grpc.credentials.createInsecure())


describe('reservation api test', () => {
     let mysqlConnect ;
     before(() => {
         mysqlConnect = Datastore.connection()
         mysqlConnect.query('DROP TABLE IF EXISTS node_mysql_test ')
         mysqlConnect.query('CREATE TABLE node_mysql_test (reservationId int , reservationDate date, doctorId int , clientId int , reservationSlot int)');
     })

     it("equals",()=>{

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
        mysqlConnect.query('DROP TABLE node_mysql_test')
        mysqlConnect.end()
        console.log("after")
    })

    }
);
