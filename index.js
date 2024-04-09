require("dotenv").config();

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authController = require("./controllers/auth");
const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const studentRoutes = require("./Routes/student");
const companyRoutes = require("./Routes/company");
// const adminRoutes = require("./Routes/admin");

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));

app.post("/login", authController.postLogin);
app.use(authController.is_auth);
app.use("/s", authController.is_student, studentRoutes);
app.use("/c", authController.is_company,  companyRoutes);
// app.use("/a", adminRoutes);
app.use(errorController.get404);

app.listen(process.env.PORT || 3000, () => {
  console.log("server listening on port: 3000");
});