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



describe('reservation api test(Creat Read)', function () {

    let dataStore ;
    let server ;

    before(async function(){
                dataStore = new Datastore()

                await dataStore.pool.query('DROP TABLE IF EXISTS reservation')
                await dataStore.pool.query('DROP TABLE IF EXISTS client')
                await dataStore.pool.query('DROP TABLE IF EXISTS doctor')


                await dataStore.pool.query('CREATE TABLE client(clientId varchar(255) , clientName varchar(255),primary key (clientId) )')
                await dataStore.pool.query('INSERT INTO client set ?',  {  clientId   : 1, clientName : "alex"});
                await dataStore.pool.query('INSERT INTO client set ?',  {  clientId   : 2, clientName : "sergay"});
                await dataStore.pool.query('INSERT INTO client set ?',  {  clientId   : 3, clientName : "petr"});
                
                await dataStore.pool.query('CREATE TABLE doctor(doctorId varchar(255) , doctorName varchar(255),primary key (doctorId))')
                await dataStore.pool.query('INSERT INTO doctor set ?',  {  doctorId   : 1, doctorName : "doctorAlex"});
                await dataStore.pool.query('INSERT INTO doctor set ?',  {  doctorId   : 2, doctorName : "doctorSergay"});
                await dataStore.pool.query('INSERT INTO doctor set ?',  {  doctorId   : 3, 
                    doctorName : "doctorPetr"});

                await dataStore.pool.query('create table reservation (reservationId varchar(255) , reservationDate varchar(255), doctorId varchar(255) , \
                  clientId varchar(255) , reservationSlot varchar(255), PRIMARY KEY( reservationDate, doctorId,reservationSlot), UNIQUE KEY(reservationId),\
                  foreign key clientIdFK(clientId) references client(clientId),foreign key doctorIdFK(doctorId) references doctor(doctorId))');
            
                //mysqlConnect.query('DELETE  from reservation')
                server = new Server()
                await server.serverStart()
               
                console.log("====== testing preparaion is ready ==============")

    });

    it("#1 201 reservation(id:2 sergay makes reservation at 20200101 timeslot 5 to id:1 doctorAlex ) create by api correctly",async()=>{

        await client.MakeReservation(
            {  reservationId   : "1111111", 
        　　　　reservationDate : "20200101",
               doctorId        : '1', // 
               clientId        : '2', // sergay
               reservationSlot : '5'
            }, 
            (error, response) => {
                    if (!error) {
                        //console.log("make reservation")
                        //console.log(response)
                        assert.equal(response.responseCode,201)
                        //console.log(response.reservationId) //こんにちわ ID:1太郎
                    } else {
                        assert(error = null)
                        //console.error(error)
                    }
            }
        )
     })

     it("#2 400 invalid reservation(id:2 sergay makes to non-exsiting doctor ) create by api correctly",async()=>{

        await client.MakeReservation(
            {  reservationId   : "1111112", 
        　　　　reservationDate : "20200101",
               doctorId        : '11', // 
               clientId        : '2', // sergay
               reservationSlot : '5'
            }, 
            (error, response) => {
                    if (!error) {
                        //console.log("make reservation")
                        //console.log(response)
                        assert.equal(response.responseCode,400)
                        //console.log(response.reservationId) //こんにちわ ID:1太郎
                    } else {
                        assert(error = null)
                        //console.error(error)
                    }
            }
        )
     })

     it("#3 409 duplicated reservation with #1 create by api correctly",async()=>{

        await client.MakeReservation(
            {  reservationId   : "11111113", 
        　　　　reservationDate : "20200101",
               doctorId        : '1', // 
               clientId        : '2', // sergay
               reservationSlot : '5'
            }, 
            (error, response) => {
                    if (!error) {
                        //console.log("make reservation")
                        //console.log(response)
                        assert.equal(response.responseCode,409)
                        //console.log(response.reservationId) //こんにちわ ID:1太郎
                    } else {
                        assert(error = null)
                        //console.error(error)
                    }
            }
        )
     })

     it("#4 400 invalid time slot reservation to timeslot 22 ",async()=>{

        await client.MakeReservation(
            {  reservationId   : "2222222", 
        　　　　reservationDate : "20200101",
               doctorId        : '4',
               clientId        : '3',
               reservationSlot : '22' // time slot should be 1-10
            }, 
            (error, response) => {
                    if (!error) {
                        assert.equal(response.responseCode,400)
                    } else {
                        assert(error = null)
                        //console.error(error)
                    }
            }
        )
     })


    it('#5 200 reservation querying by api correctly(like integration test)"',async function(){
  
        await client.GetReseravtion(
            {
            reservationId: 1111111
            }, 
            (error, response) => {
                    if (!error) {
                        assert.equal(response.responseCode,200)
                    } else {
                        assert(error = null)
                        //console.error(error)
                    }
            }
         )
    });

    it('#6 404 reservation querying by api when there is no value"',async function(){

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
                        assert(error = null)
                        console.error(error)
                    }
            }
         )

       
    });

     

    after(async function(){
        await dataStore.pool.end()
        //await server.serverStop()
        console.log("after")
    });

    
});

