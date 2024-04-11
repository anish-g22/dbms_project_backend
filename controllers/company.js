const pool = require("../util/connectionPool");

exports.getHome = (req, res, next) => {
  console.log("Connection to student path established succesfully");
  return res.status(200).send({ status: "valid" , role: "company" });
};
