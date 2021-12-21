

const grpc = require ('grpc');
const protoLoader = require ('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("calculatrice.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const calculatricePackage = grpcObject.calculatricePackage;


const client = new calculatricePackage.Calculator('localhost:9000', grpc.credentials.createInsecure());

function calculate(operation, a, b) {
  const binaryOperation = {
	  val_1: a,
      val_2: b,
      operation: operation
  }
  return new Promise((resolve, reject) => {
    client.calculate(binaryOperation, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response.result);
      }
    })
  })	
	
}

function main() {
  const argv = require('yargs')
    .option({
      operation: {
        describe: 'The operation to perform',
        demandOption: true,
        choices: ['add', 'subtract', 'divide', 'multiply'],
        type: 'string'
      },
      a: {
        describe: 'The first operand',
        demandOption: true,
        type: 'number'
      },
      b: {
        describe: 'The second operand',
        demandOption: true,
        type: 'number'
      }
    }).argv;
  calculate(argv.operation, argv.a, argv.b).then((value) => {
    console.log(value);
  }, (error) => {
    console.error(error);
  });
}

main();