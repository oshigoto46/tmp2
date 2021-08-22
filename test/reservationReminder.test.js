// 'use strict';


const expect    = require("chai").expect;
const path = require('path')
const pl   = require('@grpc/proto-loader')
const grpc = require('@grpc/grpc-js')

const PROTO_PATH = path.resolve(__dirname, "../protos/reservation.proto")
const pd         = pl.loadSync(PROTO_PATH)
const reminder = require('../reservationReminder')
const Server = require('../server')
const reservation = grpc.loadPackageDefinition(pd).reservation
const config     = require('../config')
const client = new reservation.Reservation(config.app.host + ":" + config.app.port, grpc.credentials.createInsecure())
const Datastore = require('../infrastructure/datastore')
const assert = require('assert');

describe('reservation reminder test', () => {

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
             
                await dataStore.pool.query('INSERT INTO reservation set ?', 
                    {  reservationId   : "222222", 
                　　　　reservationDate : "20200101",
                       doctorId        : '2', // 
                       clientId        : '1', // sergay
                       reservationSlot : '5'  // 12-13
                    });
                await dataStore.pool.query('INSERT INTO reservation set ?', 
                    {  reservationId   : "333333", 
                　　　　reservationDate : "20200101",
                       doctorId        : '1', // 
                       clientId        : '3', // sergay
                       reservationSlot : '5'  // 12-13
                    });
                //mysqlConnect.query('DELETE  from reservation')
                server = new Server()
                await server.serverStart()
               
                console.log("====== testing preparaion is ready ==============")

    });

    it("#1 remindar create by api correctly",async()=>{
        await reminder(new Date('2021/1/1 10:00')).then(
            (val) =>{
                assert.equal(val[0].reservationId,333333)
                assert.equal(val[0].reservationDate,"20200101")
                assert.equal(val[0].doctorId,1)
                assert.equal(val[0].clientId,3)
                assert.equal(val[0].reservationSlot,5)

                assert.equal(val[1].reservationId,222222)
                assert.equal(val[1].reservationDate,"20200101")
                assert.equal(val[1].doctorId,2)
                assert.equal(val[1].clientId,1)
                assert.equal(val[1].reservationSlot,5)
            }
          )
     })
})


