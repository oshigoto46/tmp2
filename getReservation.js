async function getReservation(call, callback) {
  //if(true){console.log(call)}
  let ret = await this.dataStore
    .select(
      `select * from reservation where reservationId=${call.request.reservationId}`
    )
    .then((val) => {
      if (val.length === 1) {
        return callback(null, {
          responseCode: 200,
          reservationId: val[0].reservationId,
          status: grpc.status.INTERNAL,
        });
      } else if (val.length === 0) {
        return callback(null, {
          responseCode: 404,
          reservationId: null,
          status: grpc.status.INTERNAL,
        });
      } else {
        return callback(null, {
          responseCode: 409,
          reservationId: null,
          status: grpc.status.INTERNAL,
        });
      }
    })
    .catch((val) => {
      return callback(null, {
        responseCode: 503,
        reservationId: null,
        status: grpc.status.INTERNAL,
      });
    });
}

module.exports = getReservation;
