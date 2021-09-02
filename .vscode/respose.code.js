const reponse = {
  200: {
    responseCode: 200,
    reservationId: val[0].reservationId,
    status: grpc.status.INTERNAL,
  },
  404: {
    responseCode: 404,
    reservationId: null,
    status: grpc.status.INTERNAL,
  },
  409: {
    responseCode: 409,
    reservationId: null,
    status: grpc.status.INTERNAL,
  },
  503: {
    responseCode: 503,
    reservationId: null,
    status: grpc.status.INTERNAL,
  },
};
