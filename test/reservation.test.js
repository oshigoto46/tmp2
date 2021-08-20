'use strict';

const Datastore = require('../infrastructure/Datastore')
const expect    = require("chai").expect;


describe('simple test', () => {

     before(() => {console.log("before")})

     it("equals",()=>{
         expect(1).to.equal(1);
     })

    after(() => {console.log("after")})

    }
);
