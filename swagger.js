const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger.json";
const endpointsFiles = ["./app.js"];

const doc = {
  info: {
    title: "rescannr API",
    description: "rescannr api documentation",
  },
  host: null,
  schemes: ["http", "https"],
  definitions: {
    auth: {
      $email: "string",
      $password: "string",
    },
    receiptScanning: {
      $url: "string",
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
