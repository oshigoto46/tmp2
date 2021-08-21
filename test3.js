const Datastore = require('./infrastructure/Datastore')
let ret
(async () => {
   ret = await (Datastore.execute('select * from reservation'))
   console.log("fin")
   console.log(ret)
})();

