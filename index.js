require("dotenv").config();

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const studentRoutes = require("./Routes/student");
// const adminRoutes = require("./Routes/admin");
// const companyRoutes = require("./Routes/company");

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use("/s", studentRoutes);
// app.use("/a", adminRoutes);
// app.use("/c", companyRoutes);
app.use(errorController.get404);


app.listen( process.env.PORT || 3000, () => {
  console.log("server listening on port: 3000");
});