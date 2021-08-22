'use strict';

const expect    = require("chai").expect;
const path = require('path')
const pl   = require('@grpc/proto-loader')
const grpc = require('@grpc/grpc-js')

const PROTO_PATH = path.resolve(__dirname, "../protos/reservation.proto")
const pd         = pl.loadSync(PROTO_PATH)
const assert = require('assert');

const config     = require('../config')
const uuidv4 = require('uuid/v4');


const reservation = grpc.loadPackageDefinition(pd).reservation
const client = new reservation.Reservation(config.app.host + ":" + config.app.port, grpc.credentials.createInsecure())
const Server = require('../server')
const Datastore = require('../infrastructure/Datastore')


function asyncAdd(a, b) {
    return new Promise((resolve) => {
      resolve(a+b);
    });
  };

describe('DESCRIBE-1', function () {
    console.log('describe(1)-top');


    let dataStore ;
    let server ;

    before(async function(){
                dataStore = new Datastore()
                await dataStore.pool.query('DROP TABLE IF EXISTS reservation').then()
                await dataStore.pool.query('CREATE TABLE reservation (reservationId int , reservationDate date, doctorId int , clientId int , reservationSlot int)');
                //mysqlConnect.query('DELETE  from reservation')
                server = new Server()
                await server.serverStart()
                await dataStore.pool.query('INSERT INTO reservation set ?',  {  
                    reservationId   : 111111111, 
             　　　　reservationDate : "20200101",
                    doctorId        : '4',
                    clientId        : '3',
                    reservationSlot : '5'
                 },);
                console.log("======準備完了==============")

    });


    it('200 reservation querying by api when there is a value"',async function(){
        const val = 111111111
        await client.GetReseravtion(
            {
            reservationId: 111111111
            }, 
            (error, response) => {
                    if (!error) {
                    // console.log(response)
                    //   console.log(response)
                        assert.equal(response.responseCode,200)
                    } else {
                        console.error(error)
                    }
            }
         )
    });

    it('404 reservation querying by api when there is no value"',async function(){

        await client.GetReseravtion(
            {
            reservationId: 222222
            }, 
            (error, response) => {
                    if (!error) {
                    // console.log(response)
                    //   console.log(response)
                        assert.equal(response.responseCode,404)
                    } else {
                        console.error(error)
                    }
            }
         )

       
    });

    it('テスト2', function(){
        console.log('describe(1)-it(2)');
    });


    after(async function(){
       // await dataStore.pool.end()
        console.log("after")
    });

    
    console.log('describe(1)-bottom');
});


// describe('reservation api test',  () => {

//      let dataStore ;
//      let server ;

//      beforeAll((done) => {
//          dataStore = new Datastore()
//          dataStore.pool.query('DROP TABLE IF EXISTS reservation')
//          dataStore.pool.query('CREATE TABLE reservation (reservationId int , reservationDate date, doctorId int , clientId int , reservationSlot int)');
//          //mysqlConnect.query('DELETE  from reservation')
//          server = new Server()
//          server.serverStart()
//          console.log("======準備完了==============")
//          done()
//      })

//     //  test("reservation makes by api",()=>{
        
//     //     client.GetReseravtion(
//     //         {
//     //         reservationId: 333
//     //         }, 
//     //         (error, response) => {
//     //                 if (!error) {
//     //                 // console.log(response)
//     //                     console.log(response)
//     //                 } else {
//     //                     console.error(error)
//     //                 }
//     //         }
//     //      )
       
//     //     expect(1).to.equal(1);

//     //  })

//      test("reservation checks by api when its done",()=>{
//         client.MakeReservation(
//             {  reservationId   : uuidv4() , 
//         　　　　reservationDate : "20200101",
//                doctorId        : '4',
//                clientId        : '3',
//                reservationSlot : '5'
//             }, 
//             (error, response) => {
//                     if (!error) {
//                         console.log("make reservation")
//                         console.log(response)
//                         //console.log(response.reservationId) //こんにちわ ID:1太郎
//                     } else {
//                         console.error(error)
//                     }
//             }
//         )
//         expect(1).to.equal(1);
//      })

//     afterAll((done) => {
//         console.log("======DB廃棄==============")
//         //mysqlConnect.query('DROP TABLE reservation')
//         //mysqlConnect.end()
//         //server.serverStop()
//         console.log("after")
//         done()
//     })

//     }
// );
