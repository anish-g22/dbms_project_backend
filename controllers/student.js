const pool = require("../util/connectionPool");
const jwt = require('jsonwebtoken');

exports.getHome = (req, res, next) => {
  console.log("Connection to student path established succesfully");
  return res.status(200).send({ status: "valid" , role: "student" });
};

exports.getError = (req, res, next) => {
  console.log("Connection to student path established succesfully");
  pool
    .execute("SELECT * FROM STUDENT")
    .then(([rows, fields]) => {
      console.log("Query Fields:\n");
      console.log(fields);

      console.log("Query Results:\n");
      console.log(rows);
      const data = { rows: rows, fields: fields };
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
    });
  // res.render("index");
};

exports.getUpdates = (req, res, next) => {
  pool
    .execute("SELECT MID 'SNO', CONTENT 'Update' FROM MESSAGES")
    .then(([rows, fields]) => {
      console.log("Query Fields:\n");

      col_names = [];
      for (const [key, value] of fields.entries()) {
        // console.log(key, value);
        col_names.push(value.name);
      }
      console.log(col_names);

      // console.log("Query Results:\n");
      // console.log(rows);
      const data = { fields: col_names, rows: rows };
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getAllJobs = (req, res, next) => {
  console.log("Hiiii")
  pool
    .execute("SELECT * FROM JOB")
    .then(([rows, fields]) => {
      console.log("Query Fields:\n");

      col_names = [];
      for (const [key, value] of fields.entries()) {
        // console.log(key, value);
        col_names.push(value.name);
      }
      console.log(col_names);

      // console.log("Query Results:\n");
      // console.log(rows);
      const data = { fields: col_names, rows: rows };
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getStudentProfiles = (req, res, next) => {

  console.log("Student Profile Requested\n");

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('Authorization header not found');
  }

  const token = authHeader.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const sroll = decodedToken.user_id || null;  

  pool
    .execute("SELECT * FROM STUDENT WHERE SROLL = ?", [sroll])
    .then(([rows, fields]) => {

      const data = rows[0];

      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    })
};

exports.getAuth = (req, res, next) => {
  console.log("Auth Page Requested\n");
  res.render("Auth/login");
};
