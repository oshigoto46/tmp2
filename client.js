const path = require('path')
const Mali = require('Mali')
const pl = require('@grpc/proto-loader')
const grpc = require('@grpc/grpc-js')
const mysql = require('mysql');
const PROTO_PATH = path.resolve(__dirname, "./protos/helloworld.proto")

const pd = pl.loadSync(PROTO_PATH)
const helloproto = grpc.loadPackageDefinition(pd).helloworld
const client = new helloproto.Greeter("127.0.0.1:50051", grpc.credentials.createInsecure())

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'P@ssw0rd',
    database: 'yamamoto'
});


client.sayHello({ name: 'Hoge' }, (err, response) => {
    connection.query('SELECT * from pet;', function (err, rows, fields) {
    if (err) { console.log('err: ' + err); }

        console.log('name: ' + rows[0].name);

    });
    console.log(response)
})