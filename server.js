


const grpc = require ('grpc');
const protoLoader = require ('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("calculatrice.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const calculatricePackage = grpcObject.calculatricePackage;

const server = new grpc.Server();

server.bind('localhost:9000', grpc.ServerCredentials.createInsecure());
server.addService(calculatricePackage.Calculator.service, {
'Calculate' : calculate
});

server.start();

function calculate (call, callback) {
  let result;
  if (call.request.operation === 'add') {
      result = call.request.val_1 + call.request.val_2;
  } else if (call.request.operation === 'subtract'){
	  result = call.request.val_1 - call.request.val_2
  } else if (call.request.operation === 'divide') {
	  result = call.request.val_1 / call.request.val_2;
  } else {
      result = call.request.val_1 * call.request.val_2;
  }
  callback(null, {'result': result});
}

