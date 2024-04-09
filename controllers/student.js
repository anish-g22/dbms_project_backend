const pool = require("../util/connectionPool");

exports.getHome = (req, res, next) => {
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

exports.getAuth = (req, res, next) => {
  console.log("Auth Page Requested\n");
  res.render("Auth/login");
};
