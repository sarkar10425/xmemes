const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const swaggerApp = express();
const swaggerPort = process.env.PORT || 8080;
const PORT  = process.env.PORT || 8081;


swaggerApp.use(cors());

swaggerApp.use(
  "/swagger-ui",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

swaggerApp.listen(swaggerPort, () =>
  console.log(`Swagger UI running at port: ${swaggerPort}`)
);