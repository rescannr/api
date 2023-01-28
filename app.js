const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const session = require("express-session");
const passport = require("passport");
const connectMongoDB = require("./db/mongodb.js");
require("dotenv").config();

const receipt_scanning_router = require("./routes/receipt_scanning");

const app = express();
const port = process.env.EXPRESS_PORT;

app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/inv_scn", receipt_scanning_router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectMongoDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
