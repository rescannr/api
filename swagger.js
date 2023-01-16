const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger.json";
const endpointsFiles = ["./app.js"];

const doc = {
  info: {
    title: "rescannr API",
    description: "rescannr api documentation",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
