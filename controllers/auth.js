const pool = require("../util/connectionPool");
const bcrypt = require("bcrypt");

exports.postLogin = (req, res, next) => {
  return res.redirect("/s");
};

exports.is_auth = (req, res, next) => {
  valid = true;
  if (valid) return next();
  console.log("failed");
  res.send("failed");
};

exports.is_student = (req, res, next) => {
  valid = false;
  if (!valid) return next();
  //   console.log("failed");
  //   res.send("failed");
};

exports.is_company = (req, res, next) => {
  valid = true;
  if (valid) return next();
  console.log("failed");
  res.send("failed");
};

exports.updatePass = (req, res, next) => {
  var Row = [];
  pool
    .execute("SELECT aid user_id, PASS FROM ADMINISTRATOR")
    .then(([rows, field]) => {
      console.log(rows);
      rows.forEach((element) => {
        console.log(element, "\n");
        bcrypt
          .hash(element.PASS, 11)
          .then((res) => {
            console.log(element, " ", res);
            return pool.execute("INSERT INTO USERS VALUES (?, ?, ?)", [
              element.user_id,
              res,
              "admin",
            ]);
          })
          .then((res) => console.log(res, " Inserted successfully"))
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log(err));
  // for (let index = 0; index < Row.length; index++) {
  //   const element = array[index];

  // }
  res.redirect("/");
};
