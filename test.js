function sayHello(ctx){
  ctx.res = { message: 'Hello ' + ctx.req.name }
}


console.log(sayHello)

module.exports = sayHello
