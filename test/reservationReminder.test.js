'use strict';

const Datastore = require('../infrastructure/Datastore')
const expect    = require("chai").expect;
const cron = require('node-cron');
const sinon = require("sinon");
const reminder = require('../reservationReminder')



describe('reservation reminder test', () => {

     before(() => {
         console.log("before")
      })
     
     it("equals",()=>{
        // const scheduleSpy = jest.spyOn(cron, 'schedule');
       
        //  const logSpy = jest.spyOn(console, 'log');
        //  expect(logSpy).toBeCalledWith('DO SOME DATA PROCESSING');
        expect(1).to.equal(1);

        const scheduleStub = sinon
        .stub(cron, "schedule")
        .yields()
        .returns({});

        reminder()
     })

    after(() => {console.log("after")})

    }
);
