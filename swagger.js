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
};

swaggerAutogen(outputFile, endpointsFiles, doc);
