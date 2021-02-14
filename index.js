const express = require("express");
const app = express();
const PORT = process.env.PORT || 8081;
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const { MONGOURI } = require("./config/keys");

mongoose.connect(MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;


db.on("connected", () => {
  console.log("Connected to Mongo DB !!");
});

db.on("error", (err) => {
  console.log("Error Connecting", err);
});

app.use(cors());

require("./models/meme");

app.use(express.json());
app.use("/", require('./routes/get'))
app.use("/", require('./routes/post'))
app.use("/", require('./routes/update'))
app.use("/", require('./routes/delete'))

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Swagger UI

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const swaggerApp = express();
const swaggerPort = process.env.PORT || 8080;


swaggerApp.use(cors());

swaggerApp.use(
  "/swagger-ui",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

swaggerApp.listen(swaggerPort, () =>
  console.log(`Swagger UI running at port: ${swaggerPort}`)
);

app.listen(PORT, () => console.log(`App Listening at port number :${PORT}`));
