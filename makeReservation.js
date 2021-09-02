async function makeReservation(call, callback) {
  //console.log(call.request)

  if (call.request.reservationSlot <= 1 || call.request.reservationSlot >= 10) {
    return callback(null, {
      responseCode: 400,
      status: grpc.status.INTERNAL,
    });
  }

  await this.dataStore
    .insert({
      reservationId: call.request.reservationId,
      reservationDate: call.request.reservationDate,
      doctorId: call.request.doctorId,
      clientId: call.request.clientId,
      reservationSlot: call.request.reservationSlot,
    })
    .then((val) => {
      if (val === 1) {
        callback(null, {
          responseCode: 201,
          status: grpc.status.INTERNAL,
        });
      } else {
        callback(null, {
          responseCode: 500,
          status: grpc.status.INTERNAL,
        });
      }
    })
    .catch(
      (err) => {
        let str = "" + err;
        // console.log(err)
        if (str.indexOf("ER_DUP_ENTRY") > 0) {
          callback(null, {
            responseCode: 409,
            status: grpc.status.INTERNAL,
          });
        } else if (str.indexOf("ER_NO_REFERENCED_ROW_2") > 0) {
          callback(null, {
            responseCode: 400,
            status: grpc.status.INTERNAL,
          });
        } else {
          console.log("some another error" + err);
          callback(null, {
            responseCode: 102,
            status: grpc.status.INTERNAL,
          });
        }
      }
      //results =>callback(null, { success: results})
    );
}

module.exports = makeReservation;
