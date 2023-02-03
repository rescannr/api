const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const session = require("express-session");
const passport = require("passport");
const connectMongoDB = require("./db/mongodb.js");
const omnibusRateLimiter = require("./middleware/rateLimiting/omnibusRateLimiter.js");
require("dotenv").config();

const userAuth = require("./routes/userAuth.js");
const receipt_scanning_router = require("./routes/receiptScanning");

const app = express();
const port = process.env.EXPRESS_PORT;

app.use(omnibusRateLimiter);

let sessionConfig = {
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
  },
};

if (process.env.ENVIROMENT !== "development") {
  sessionConfig.cookie.secure = true;
}

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", userAuth);
app.use("/", receipt_scanning_router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectMongoDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
