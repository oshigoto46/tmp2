function sayHello(ctx){
  ctx.res = { message: 'Hello Response (in test.js)' + ctx.req.name }
}


console.log(sayHello)

module.exports = sayHello
