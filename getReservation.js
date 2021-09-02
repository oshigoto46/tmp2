async function getReservation(call, callback) {
  //if(true){console.log(call)}
  let ret = await this.dataStore
    .select(
      `select * from reservation where reservationId=${call.request.reservationId}`
    )
    .then((val) => {
      if (val.length === 1) {
        return callback(null, response.200);
      } else if (val.length === 0) {
        return callback(null,response.404 );
      } else {
        return callback(null,response.409);
      }})
    .catch((val) => {
      return callback(null,response.503 );
    });
}

module.exports = getReservation;
